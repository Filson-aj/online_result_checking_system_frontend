import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation } from '../../store/apis/usersApiSlice'
import useTitle from '../../hooks/useTitle'
import { selectCurrentMessage, setMessage, resetMessage } from '../../store/slice/messageSlice'
import { selectCurrentSpinner, setSpinner } from '../../store/slice/spinnerSlice'
import EditUserForm from './EditUserForm'
import MessageBox from '../../components/uis/MessageBox/MessageBox'
import ConfirmMessageBox from '../../components/uis/ConfirmMessageBox/ConfirmMessageBox'
import Spinner from '../../components/uis/Spinner/Spinner'

const EditUser = () => {
    useTitle('Update: Edit User')

    const [deleteRecord, setDeleteRecord] = useState(false)

    const navigate = useNavigate(),
        dispatch = useDispatch(),
        message = useSelector(selectCurrentMessage),
        spinner = useSelector(selectCurrentSpinner)

    const { id } = useParams(),
        { user } = useGetUsersQuery('userList', {
            selectFromResult: ({ data }) =>({
                user: data?.entities[id]
            }),
        })

    
    const [updateUser, {
        isSuccess,
        }] = useUpdateUserMutation()
    
    const [deleteUser, {
        isSuccess: isDelSuccess,
        }] = useDeleteUserMutation()

    const onSave = async(data) =>{
        const payload = {
            id: user?.id,
            username: data?.username,
            roles: data?.roles,
            active: data?.active,
            updatedAt: Date.now(),
        }
        const status = true
        let title = 'Update Record', type, text
        dispatch(setSpinner({ visibility: true }))
    
        try {
            const response = await updateUser(payload)
            if(response?.error){
                type = 'Error'
                text = response?.error?.data?.message || `An error occured while editing user's record`
            }else{
                type = 'Success'
                text = response?.data?.message || `User's record has been updated successfully!`
            }
            dispatch(setSpinner({ visibility: false }))
            dispatch(setMessage({ status, type, text, title }))
        } catch (err) {
            dispatch(setSpinner(false))
            type = 'Error'
            text = err?.data?.message || 'An error occured while editing record'
            dispatch(setMessage({ status, type, text, title }))
        }
    }

    const onDelete = async(id) =>{
        const status = true
        let title = 'Delete Record', type, text
        setDeleteRecord(false)
        dispatch(setSpinner({ visibility: true }))
        try {
          const response = await deleteUser({ id: id })
          setTimeout(() => {
            dispatch(setSpinner({ visibility: false }))
          }, 500)
          if(response?.error){
            type = 'Error'
            text = response?.error?.data?.message ||  `An error occured while deleting user's record!`
          }else{
            type = 'Success'
            text = response?.data?.message || `User's record has been successfully deleted!`
          }
          dispatch(setMessage({ status, type, text, title }))
        } catch (err) {
          console.log(err)
          dispatch(setSpinner(false))
          type = 'Error'
          text = err?.data?.message || `An error occured while deleting user's record!`
          dispatch(setMessage({ status, type, text, title }))
        }
    }

    const onDismiss = () =>{
        dispatch(resetMessage())
        if(isSuccess || isDelSuccess || message.type === 'Success'){
           navigate('/dashboard/users')
        }
    }
    
    const handleCancel = () =>{
        navigate('/dashboard/users')
    }

    let content

    
    if(!user){
        content = <div className='mx-auto bg-white text-gray-900 shadow-lg rounded-md p-8 mt-16 w-3/4'>Loading User Info...</div>
    }else{
        content = <EditUserForm user={user} onSave={onSave} onCancel={handleCancel} onDelete={() =>setDeleteRecord(true)} />
    }

    return (
        <>
            {spinner && <Spinner />}
            {message?.status && <MessageBox open message={message?.text} title={message?.title} close={onDismiss} />}
            {deleteRecord && <ConfirmMessageBox open message={`Are you sure you want to delete this record?`}
            title={`Delete Record`} close={() => setDeleteRecord(false)}
            confirm={() =>onDelete(user.id)} />}
            {content}
        </>
    )
}

export default EditUser

