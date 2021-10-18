import React from "react";
import ContactInfo from "./ContactInfo";
import ContactDetails from "./ContactDetails";
import ContactCreate from "./ContactCreate";
import update from "react-addons-update";

export default class Contact extends React.Component{

    constructor(props){
        super(props);
        this.state={
            selectedKey:-1,
            keyword:'',
            ContactData:[
            {
                name:'Abet',
                phone:'010-0000-0001'
            },
            {
                name:'Betty',
                phone:'010-0000-0002'
            },
            {
                name:'Charlie',
                phone:'010-0000-0003'
            },
            {
                name:'David',
                phone:'010-0000-0004'
            }]
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleClick=this.handleClick.bind(this);

        this.handleCreate=this.handleCreate.bind(this);
        this.handleRemove=this.handleRemove.bind(this);
        this.handleEdit=this.handleEdit.bind(this);
        }

        componentWillMount(){
            const ContactData=localStorage.ContactData;
            if(ContactData){
                this.setState({
                    ContactData:JSON.parse(ContactData)
                })
            }
        }
        componentDidUpdate(prevProps,prevState){
            if(JSON.stringify(prevState.COntactData) != JSON.stringify(this.state.ContactData)){
                localStorage.ContactData=JSON.stringify(this.state.ContactData)
            }
        }

    handleChange(e){
        this.setState({
            keyword:e.target.value
        })
    }
    handleClick(key){
        this.setState({
            selectedKey:key
        })
        console.log(key,'is selected');
    }
    handleCreate(contact){

        this.setState({
            ContactData:update(this.state.ContactData,{$push:[contact]})
        })

    }
    handleRemove(){
        if(this.state.selectedKey<0){
            return;
        }
        this.setState({
            ContactData:update(this.state.ContactData,
                {$splice:[[this.state.selectedKey,1]]}
                ),
                selectedKey:-1
        })
    }
    handleEdit(name,phone){
        this.setState({
            ContactData:update(this.state.ContactData,
                {
                    [this.state.selectedKey]:{
                        name:{$set:name},
                        phone:{$set:phone}
                    }
                })
        })
    }
    render(){
            const mapToComponents=(data)=>{
                data.sort();
                data=data.filter(
                    (contact)=>{
                        return contact.name.toLowerCase()
                        .indexOf(this.state.keyword.toLowerCase()) > -1;
                    }
                );
                return data.map((contact,i)=>{
                    return (<ContactInfo 
                        contact={contact} 
                        key={i}
                        onClick={()=>this.handleClick(i)}
                        />);
                });
            };

            return(
                <div>
                    <h1>Contacts!</h1>
                    <input 
                    name="keyword" 
                    placeholder="Search" 
                    value={this.state.keyword}
                    onChange={this.handleChange}
                    />
                    <div>{mapToComponents(this.state.ContactData)}</div>
                    <ContactDetails
                        isSelected={this.state.selectedKey !=-1}
                        contact={this.state.ContactData[this.state.selectedKey]}
                        onRemove={this.handleRemove}
                        onEdit={this.handleEdit}
                    />
                    <ContactCreate
                        onCreate={this.handleCreate}
                    />
                </div>
            );
        }
    
}