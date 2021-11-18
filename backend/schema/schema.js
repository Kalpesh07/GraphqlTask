const graphql = require('graphql');
const _ = require('lodash');
//const { axios } = require('axios');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema, GraphQLNonNull, GraphQLBoolean } = graphql;


let task =[
    {id:"1",name:"Foundation",completed:false},
    {id:"2",name:"Discovery",completed:false},
    {id:"3",name:"Delivery",completed:false},
];
let subtask =[
    { id:"1",name:"Setup Virtual office",taskid:"1",checked: false},
    {id:"2",name:"Set vision and mission",taskid:"1",checked: false},
    {id:"3",name:"Select business name",taskid:"1",checked: false},
    {id:"4",name:"Buy domains",taskid:"1",checked: false},
    { id:"5",name:"Create Roadmap",taskid:"2",checked: false},
    {id:"6",name:"Competitor Analysis",taskid:"2",checked: false},
    {id:"7",name:"Release marketing website",taskid:"3",checked: false},
    {id:"8",name:"Release MVP",taskid:"3",checked: false},
];

const TaskType = new GraphQLObjectType({
    name:"Task",
    fields:() => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        completed:{type: GraphQLBoolean},
        subtask:{
            type: new GraphQLList(SubtaskType),
            resolve(parent,args){
                //return axios.get(`http://localhost:5000/subtaskByTask/${parent.id}`)
                //.then(res => res.data)
                return _.filter(subtask,{taskid:parent.id})
            }
        }
    })
})

const SubtaskType = new GraphQLObjectType({
    name: "Subtask",
    fields:() => ({
        id: {type: GraphQLID},
        name:{type: GraphQLString},
        taskid:{type: GraphQLID},
        checked:{type: GraphQLBoolean},
        task:{
            type: TaskType,
            resolve(parent,args){
                return _.filter(task,{id:parent.taskid})
            }
        }
    })
}) 


const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        status: {
            type: GraphQLString,
            resolve(parent, args){
                return "Welcome to GraphQL"
            }
        },
        tasklist:{
            type: new GraphQLList(TaskType),
            args: {id:{type: GraphQLID}},
            resolve(parent,args){
                console.log(args,"args");
                if(!args.id){
                    return _.filter(task,{})
                }
                
                return _.filter(task,{'id':args.id})
            }
        },
        subtask:{
            type: new GraphQLList(SubtaskType),
            args: {id:{type: GraphQLID}},
            resolve(parent,args){
                if(!args.id){
                    return _.filter(subtask,{})
                }
                return _.filter(subtask,{'id':args.id})
            }
        },
        subtaskByTask: {
            type: new GraphQLList(SubtaskType),
            args: {id:{type: GraphQLID}},
            resolve(parent,args){
                return _.filter(subtask,{'taskid':args.id})
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        updateSubTask: {
            type: SubtaskType,
            args: {
                id:{type: GraphQLID},
                selected:{type: GraphQLBoolean}
            },
            resolve(parent,args){
                console.log("args11",args);
                console.log("parent11",parent);
                let subtasklist = _.find(subtask, { id:args.id });     
                
                if (args.selected !== undefined) {
                    subtasklist.checked = args.selected; 
                    subtasklist.allchecked = true;
                }
                let list = _.filter(subtask,{'taskid':subtasklist.taskid});
                // //console.log("list",list);
                // let modifiedArr = list.map(function(element){
                //     if(element.checked == false){
                //         subtasklist.allchecked = false;
                //             return false;
                //     }
                // });
                // if(subtasklist.allchecked == true){
                //     let tasklist = _.filter(task,{'id':subtasklist.taskid});  
                //     tasklist.completed = true; 
                // }
                //console.log("subtasklist",subtasklist);
                return subtasklist;
            }
            
        },
        updateTask: {
            type: TaskType,
            args: {
                id:{type: GraphQLID},
                selected:{type: GraphQLBoolean}
            },
            resolve(parent,args){
                //console.log("args",args);
                //console.log("parent",parent);
                let tasklist = _.find(task, { id:args.id });    
                let objIndex = task.findIndex(x => x.id == args.id);
                //console.log("objeind",objIndex);
                let remaintask=task.slice(0, objIndex);
                console.log("remaintask",remaintask);
                let remainchecked =  true;
                remaintask.map(function(ele){
                    let subtasklists = _.filter(subtask, { taskid:ele.id });  
                    //console.log("subtask",subtasklists);    
                    let modifiedArr = subtasklists.map(function(element){
                        if(element.checked == false){
                            remainchecked = false;
                            return false;
                        }
                    });
                });
                
                console.log("remainchecked",remainchecked);
                let subtasklists = _.filter(subtask, { taskid:args.id });  
                //console.log("subtask",subtasklists);
                let allchecked = true;   
                let modifiedArr = subtasklists.map(function(element){
                    if(element.checked == false){
                        allchecked = false;
                        return false;
                    }
                });
            
                if (allchecked == true && remainchecked == true) {
                    tasklist.completed = true; 
                }else{
                    tasklist.completed = false; 
                }
                //console.log("tasklist",tasklist);
                return tasklist;
            }
            
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});