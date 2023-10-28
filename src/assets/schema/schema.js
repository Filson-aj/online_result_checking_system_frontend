import * as yup from 'yup'

//login form schema definition
export const signinSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().min(8).max(32).required('Password is required'),
})

export const userSchema = yup.object().shape({//scheme for signup form
    username: yup.string().required('Username is required'),
})

export const newUserSchema = yup.object().shape({//scheme for new user form
    username: yup.string().required('Username is required'),
    password: yup.string().min(8).max(32).required('Password is required'),
    confirm_password: yup.string().min(8).max(32).required('Confirm password is required')
        .oneOf([yup.ref('password'), null], 'Passwords does not match'),
})

export const signupSchema = yup.object().shape({//scheme for signup form
    username: yup.string().required('Username is required'),
    password: yup.string().min(8).max(32).required('Password is required'),
    confirm_password: yup.string().min(8).max(32).required('Confirm password is required')
        .oneOf([yup.ref('password'), null], 'Passwords does not match'),
})

export const courseSchema = yup.object().shape({//schema for courses data
    code: yup.string().min(2).max(8).required(`Course code is required`),
    title: yup.string().required(`Course title is required`),
    level: yup.string().required(`Course level is required`),
    semester: yup.string().required(`Course semester is required`),
    unit: yup.number().min(1).max(12).required(`Course unit is required`),
    staffId: yup.string().required(`Course lecturer is required`),
})

export const staffSchema = yup.object().shape({//schema for staff data
    staffId: yup.string().required(`Staff's ID is required`),
    firstName: yup.string().required(`First name is required`),
    surname: yup.string().required(`Surname is required`),
    gender: yup.string().min(1).max(12).required(`Gender is required`),
    qualification: yup.string().required(`Qualification is required`),
    phone: yup.string().required(`Phone number is required`),
    address: yup.string().required(`Address is required`),
    password: yup.string().min(8).max(32).required('Password is required'),
    confirm_password: yup.string().min(8).max(32).required('Confirm password is required')
        .oneOf([yup.ref('password'), null], 'Passwords does not match'),
})
export const staffsSchema = yup.object().shape({//schema for staff data
    staffId: yup.string().required(`Staff's ID is required`),
    firstName: yup.string().required(`First name is required`),
    surname: yup.string().required(`Surname is required`),
    gender: yup.string().min(1).max(12).required(`Gender is required`),
    qualification: yup.string().required(`Qualification is required`),
    phone: yup.string().required(`Phone number is required`),
    address: yup.string().required(`Address is required`),
})

export const studentSchema = yup.object().shape({//schema for student data
    matricNo: yup.string().required(`Matric number is required`),
    firstName: yup.string().required(`First name is required`),
    surname: yup.string().required(`Surname is required`),
    gender: yup.string().min(1).max(12).required(`Gender is required`),
    level: yup.string().required(`Level is required`),
    phone: yup.string().required(`Phone number is required`),
    address: yup.string().required(`Address is required`),
})

export const scoreSchema = yup.object().shape({//schema for course score
    matricNo: yup.string().required(`Matric number is required`),
    ca: yup.string().required(`CA is required`),
    exams: yup.string().required(`Exams is required`),
    level: yup.string().required(`Level is required`),
    semester: yup.string().required(`Semester is required`),
    session: yup.string().required(`Session is required`),
    code: yup.string().required(`Course code is required`),
})

export const resultSchema = yup.object().shape({//schema for result data
    level: yup.string().required(`Level is required`),
    semester: yup.string().required(`Semester is required`),
    session: yup.string().required(`Session is required`),
})