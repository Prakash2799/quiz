import React, { useState, useEffect } from "react";
import {Alert} from 'react-bootstrap/Alert'
import {  AppRegistry, StyleSheet,View, Animated,Text, TextInput, Button,Image, TouchableOpacity, ScrollView } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RadioButton } from 'react-native-paper';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
export default function App() {
  const qpaper=[["Transaction processing is associated with everything below except","producing detail,summary,or exception reports","recording a bussiness activity","confirming an action or trigerringa a response","maintaining data","third"],[" Which of the following is false ?","The data dictionary is normally maintained by the database administrator","Data elements in the database can be easily modified by changes in the data dictionary","The data dictionary contains the name and dictionary of each data element","A data dictionary is a tool used exclusively by the database administrator","second"],["The relational model feature is that there","Is no need for primary key data","Is much more data independance than some other database models","are explicit relationships among records","Are tables with many dimensions","second"],["The property of a database are","It is an integral collection of logically related records","It consolidates seperate files into a common pool of data records","Data stored in a database is  independant of  the  application programs using  it","All of the above","fourth"],["A primary  key if combined with a foreign key creates","Parent-Child relationship between the tables that connect them","many to many relationships between the tables that connect them","Network models between the tables that connect them ","None of the above","first"]];
  const totalq=5;
  const [checked, setChecked] = useState('-');
  const [qno,setqno]=useState(1);
  const [question,setquestion]=useState(qpaper[0][0]);
  const [ch1,setch1]=useState(qpaper[0][1]);
  const [ch2,setch2]=useState(qpaper[0][2]);
  const [ch3,setch3]=useState(qpaper[0][3]);
  const [ch4,setch4]=useState(qpaper[0][4]);
  const [ans,setans]=useState(qpaper[0][5]);
  const [score,setscore]=useState([0,0,0,0,0]);
  const [answers,setanswers]=useState(['-','-','-','-','-']);
  function update()
  {
    
      if(checked==ans)
      {
      if(score[qno-1]==0)
      {score[qno-1]=1;}
      }
      answers[qno-1]=checked
      console.log(answers);

      if(qno!=totalq)
      {
        setqno(qno+1);
        if(answers[qno]!='-')
        {
          setChecked(answers[qno]);
        }
        else
        {
          setChecked("-");
        }
      setquestion(qpaper[qno][0]);
      setch1(qpaper[qno][1]);
      setch2(qpaper[qno][2]);
      setch3(qpaper[qno][3]);
      setch4(qpaper[qno][4]);
      setans(qpaper[qno][5]);
      }
  }
  function updateprev()
  {
    
    /* Condition to store answer when previous is clicked without giving next to save answer*/ 
  
      answers[qno-1]=checked
      if(checked==ans)
      {if(score[qno-1]==0)
        {score[qno-1]=1;}}
      

    
    var x=qno-1;
    setqno(x);
    console.log(answers);
    setChecked(answers[qno-2]);
    setquestion(qpaper[qno-2][0]);
    setch1(qpaper[qno-2][1]);
    setch2(qpaper[qno-2][2]);
    setch3(qpaper[qno-2][3]);
    setch4(qpaper[qno-2][4]);
    setans(qpaper[qno-2][5]);
  }

  function WelcomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <h2>WELCOME TO DATABASE MANAGEMENT SYSTEMS QUIZ</h2><br/>
        <h4>Database is a collection of inter-related data which helps in efficient retrieval, insertion and deletion of data from database and organizes the data in the form of tables, views, schemas, reports etc. For Example, university database organizes the data about students, faculty, and admin staff etc. which helps in efficient retrieval, insertion and deletion of data from it.
        An Entity may be an object with a physical existence – a particular person, car, house, or employee – or it may be an object with a conceptual existence – a company, a job, or a university course.
An Entity is an object of Entity Type and set of all entities is called as entity set. e.g.; E1 is an entity having Entity Type Student and set of all students is called Entity Set.In this type of DBMS, the data is stored in the form of tables. Network DBMS: This type of database management system supports many to many relations where multiple user records can be linked. Object-oriented DBMS: This type of database management system uses small individual software called objects.The ten functions in the DBMS are: data dictionary management, data storage management, data transformation and presentation, security management, multiuser access control, backup and recovery management, data integrity management, database access languages and application programming interfaces, database communication 
  </h4>
        <Button title="Go to Quiz"
          onPress={() => navigation.navigate('Questions')}
        ></Button>
      </View>
    );
  }

  
  function QuestionScreen({ navigation }) {
    

    return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <CountdownCircleTimer
    isPlaying
    duration={120}
    colors={[
      ['#004777', 0.4],
      ['#F7B801', 0.4],
      ['#A30000', 0.2],
    ]}
  
  >
    {({ remainingTime, animatedColor }) => (
      
      <Animated.Text style={{ color: animatedColor }}>
        {remainingTime}
      </Animated.Text>
    )}
  </CountdownCircleTimer>
      <div>
<center>
  <h2>Quiz</h2>
  <br/>
  
  <h3>{qno}.{question}</h3>


  <View style={{ marginTop:20}}>
  <RadioButton.Group onValueChange={value => setChecked(value)} value={checked}>
      <RadioButton.Item  value="first" label={ch1}/>
      <RadioButton.Item  value="second" label={ch2} />
      <RadioButton.Item  value="third" label={ch3} />
      <RadioButton.Item  value="fourth"label={ch4} />
    </RadioButton.Group>
      </View>
     <br/><br/>

     <div className="mb-2">
   {qno!=1?
   <Button title="Previous" variant="primary" size="lg"  onPress={() => updateprev()}/>:undefined}
   {qno!=totalq?
   <Button title="Next" variant="primary" size="lg"  onPress={() => update()}/>:<Button title="Submit" variant="primary" size="lg"  onPress={() => { update();setqno(1);navigation.navigate('Submit')}}/>}
     
   
  
 </div>

     </center>  
   </div>
   </View>
      
   
    );
  }

  
  function SubmitScreen({ navigation }) {
    var sum=0;
    var namesList = score.map(function(scores){
      sum+=scores;
    });
    return  <center><h1>Congratulations !!! Your score is { sum}</h1></center>
  }


  const Stack = createStackNavigator();
  
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome to DBMS QUIZ" component={WelcomeScreen} />
        <Stack.Screen name="Questions" component={QuestionScreen} />
        <Stack.Screen name="Submit" component={SubmitScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  parent: {
    width: 300,
    height: 500,
    backgroundColor: 'red',
    margin: 50,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#e8e8e8'
  },
  baseText: {
    fontSize: 15,
    margin: 15,
  },
  titleText: {
    textAlignVertical: "center",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
})