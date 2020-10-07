import React from 'react'
import { FaPlus , FaMinus } from 'react-icons/fa'
import './ProfileCard.css'

class ProfileCard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            showData : false,
            button : <FaPlus />,
            tag : '',
            Stud_tags : []
        }
        this.toggleData = this.toggleData.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleTags = this.handleTags.bind(this);
    }

    toggleData = () => {
        this.setState({ showData : !this.state.showData })
        if(this.state.showData){
            this.setState({button : <FaPlus /> })
        }
        else{
            this.setState({button : <FaMinus /> })
        }
    }
    handleTags = (e) => {
        let thisTarget = e.target;
        if (e.key === 'Enter') {
            this.setState({tag : thisTarget.value});
            let data = {
                ID : this.props.profile.id,
                tag : this.state.tag
            }
            this.props.saveTag(data);
            this.setState({tag : ""})
        }
    }
    
    handleOnChange = (e) => {
        this.setState({tag : e.target.value})
    }

    render(){
        
        let sum = 0;
        for(let i=0; i< this.props.profile.grades.length; i++){
            sum+= Number(this.props.profile.grades[i])
        }
        const show = (this.state.showData) ? "show" : "hide" ;
        
        return(
            <div className="ProfileCard">
                <div className="profile-avatar">
                    <img alt="profile" src={this.props.profile.pic} />
                </div>
                <div className="card-body">
                    <p className="Profile-name"> {this.props.profile.firstName} {this.props.profile.lastName}</p>
                    <p> {this.props.profile.email} </p>
                    <p> {this.props.profile.company} </p>
                    <p> {this.props.profile.skill} </p>
                    <p className="padding-bottom"> {sum/this.props.profile.grades.length}% </p>
                    <div className= {"hiddent-part " +  show}>
                    {
                        this.props.profile.grades.map((grade, i) => (
                            <p key={i} > <b> Test{i+1} :</b> {grade} </p>
                        ))
                    }
                    <br/>
                    <ul>
                    {   
                        this.props.tags.map((item,j) =>{
                            if(this.props.profile.id === item.ID){
                                return <li key={ j }>{ item.tag }</li>
                            }
                            else{
                                return "";
                            }
                        })
                        
                    }
                    </ul>
                    
                    <input type="text" value={this.state.tag} placeholder="Add a tag" onChange={this.handleOnChange} onKeyDown={this.handleTags} className="add-tag-input" />
                    
                    </div>
                </div>
                <div className="expand-btn" onClick={this.toggleData}>
                    {this.state.button}
                </div>
            </div>
        )
    };
}

export default ProfileCard