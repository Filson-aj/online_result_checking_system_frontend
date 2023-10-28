import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const formatter = (number) => {
  if (isNaN(number)) {
    const formattedNumber = Number(number).toFixed(2)
    return Number(formattedNumber)
  }
  
  const formattedNumber = Number(number).toFixed(2)
  return Number(formattedNumber)
}

const ResultSlip = ({ result, level, semester, session }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      overflow: 'hidden',
    },
    body: {
      paddingTop: 20,
      paddingHorizontal: 20,
      paddingBottom: 40,
      overflow: 'hidden',
    },
    section: {
      marginBottom: 8,
    },
    header: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    details: {
      fontSize: 10,
      marginBottom: 8,
      flexDirection: 'row',
    },
    tableHeader: {
      flexDirection: 'row',
      marginBottom: 8,
      borderBottom: '1px solid #ddd',
    },
    tableHeaderText: {
      flex: 1,
      fontWeight: 'bold',
      fontSize: 10,
    },
    tableRow: {
      flexDirection: 'row',
      marginBottom: 4,
      borderBottom: '1px solid #ddd',
    },
    tableText: {
      flex: 1,
      fontSize: 10,
      paddingBottom: 10,
      
    },
    summary: {
      flexDirection: 'row',
      marginBottom: 8,
      fontSize: 10,
      fontWeight: 'bold',
      borderBottom: '1px solid #ddd',
    },
    remark: {
      fontSize: 10,
      fontWeight: 'bold',
      textAlign: 'right',
    },
  })
  

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.body}>
          {/* Header */}
          <View style={{ ...styles.header, borderBottom: '1px solid #ddd', marginBottom: 10, paddingBottom: 8, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ textAlign: 'center' }}>
              <Text style={{ textTransform: 'uppercase', fontSize: 12 }}>
                Nigerian Army College of Environmental Science & Technology, Makurdi.
              </Text>
            </View>
            <View style={{ textAlign: 'center' }}>
              <Text style={{ textTransform: 'uppercase', fontSize: 12 }}>
                The Department of Computer Science
              </Text>
            </View>
            <View style={{ textAlign: 'center' }}>
              <Text style={{ textTransform: 'capitalize', fontSize: 11 }}>
                Student's Result Slip
              </Text>
            </View>
          </View>
          {/* Details */}
          <View style={{...styles.details, borderBottom: '1px solid #ddd'}}>
            <Text style={{ fontWeight: 'bold', width: '15%' }}>Matric Number:</Text>
            <Text style={{ fontWeight: 'bold', width: '40%' }}>Name:</Text>
            <Text style={{ fontWeight: 'bold', width: '15%' }}>Level:</Text>
            <Text style={{ fontWeight: 'bold', width: '15%' }}>Semester:</Text>
            <Text style={{ fontWeight: 'bold', width: '15%' }}>Session: </Text> 
          </View>
          <View style={{...styles.details, borderBottom: '1px solid #ddd'}}>
            <Text style={{ fontWeight: 'bold', width: '15%' }}>{result?.student?.matricNo}</Text>
            <Text style={{ fontWeight: 'bold', width: '40%' }}>{`${result?.student?.name?.firstName} ${result?.student?.name?.otherName} ${result?.student?.name?.surname}`}</Text>
            <Text style={{ fontWeight: 'bold', width: '15%' }}>{level}</Text>
            <Text style={{ fontWeight: 'bold', width: '15%' }}>{semester}</Text>
            <Text style={{ fontWeight: 'bold', width: '15%' }}>{session}</Text> 
          </View>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>S/N</Text>
            <Text style={styles.tableHeaderText}>Code</Text>
            <Text style={{ width: '60%', fontSize: 10, fontWeight: 'bold' }}>Title</Text>
            <Text style={styles.tableHeaderText}>Unit</Text>
            <Text style={styles.tableHeaderText}>Grade</Text>
          </View>

          {/* Course details - Now using a table structure */}
          <View>
            {result?.courses?.map((course, index) => (
              <View key={course?.code} style={styles.tableRow}>
                <Text style={styles.tableText}>{++index}</Text>
                <Text style={styles.tableText}>{course?.code}</Text>
                <Text style={{ width: '60%', fontSize: 10 }}>{course?.title}</Text>
                <Text style={styles.tableText}>{course?.unit}</Text>
                <Text style={styles.tableText}>{course?.grade}</Text>
              </View>
            ))}
          </View>

          {/* Summary */}
          <View style={styles.summary}>
            <Text  style={{...styles.tableText, width: '15%'}}>Su: {formatter(result?.su)}</Text>
            <Text  style={{...styles.tableText, width: '15%'}}>Sp: {formatter(result?.sp)}</Text>
            <Text  style={{...styles.tableText, width: '15%'}}>Cu: {formatter(result?.cu)}</Text>
            <Text  style={{...styles.tableText, width: '15%'}}>Cp: {formatter(result?.cp)}</Text>
            <Text  style={{...styles.tableText, width: '20%'}}>Gpa: {formatter(result?.gpa)}</Text>
            <Text  style={{...styles.tableText, width: '20%'}}>Cgpa: {formatter(result?.cgpa)}</Text>
          </View>

          {/* Remark */}
          <Text style={styles.remark}>
            <Text style={{ fontStyle: 'italic', fontWeight: 'extrabold' }}>Remark:</Text> {result?.remark}
          </Text>
        </View>
      </Page>
    </Document>
  )
}

export default ResultSlip