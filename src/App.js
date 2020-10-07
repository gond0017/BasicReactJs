import React from 'react';
import './App.css';
import AppHeader from './AppHeader';
import ProfileCard from './ProfileCard';

class App extends React.Component {

  state = {
    profiles : [],
    searchResult : [],
    searchTerm : '',
    KEY : 'SNEHAL_STUDENT_TAGS',
    savedTags : [],
    searchTag : '',
    searchedTags : []
  }

  getProfiles() {
    fetch(`https://api.hatchways.io/assessment/students`)
    .then(res => {
          if(res.ok){
            return res.json()
          }else{
            return "Something went wrong"
          }
    })
    .then(profiles => this.setState({ profiles: profiles.students }))
    .catch(console.error)
  }

  handleInputChange = (event) => {
      
    this.setState({  searchTerm : event.target.value })
    this.setState ({ searchResult : this.state.profiles.filter(profile => { 
        return( profile.firstName.toLowerCase().includes(event.target.value) || profile.lastName.toLowerCase().includes(event.target.value))
    } )})
}

handleTagInputChange = (event) => {
  this.setState({  searchTag : event.target.value })
if(event.target.value === ""){
  this.setState({searchResult : []})
}
  else{
    this.setState ({ searchedTags : this.state.savedTags.filter(tag => { 
      return( tag.tag.toLowerCase().includes(event.target.value))
  } )})

    let tags = []
    this.state.searchedTags.map(t=>{
      return tags = [...tags,...this.state.profiles.filter(p => {
        return p.id === t.ID
      })]
    })
    this.setState({ searchResult : tags })
  }
}

saveTagsofStud = (data) => {
  let newData = [data, ...this.state.savedTags]
  localStorage.setItem(this.state.KEY,JSON.stringify(newData));
  this.setState({ savedTags : newData })
}

getTagsOfStudents = () => {
  if(localStorage.getItem(this.state.KEY)){
      this.setState({ savedTags : JSON.parse(localStorage.getItem(this.state.KEY))})
  }
  else{
      localStorage.setItem(this.state.KEY,JSON.stringify(this.state.savedTags));
  }
}

componentDidMount () {
  this.getProfiles();
  this.getTagsOfStudents();
}

render(){
  
  let profileJsx = ''

  if(this.state.searchResult.length > 0){
    profileJsx = this.state.searchResult.map(profile =>
      (<ProfileCard key={profile.id} saveTag={this.saveTagsofStud} tags={this.state.savedTags} profile={profile} />) )
  }else{
    profileJsx = this.state.profiles.map(profile =>
      (<ProfileCard key={profile.id} saveTag={this.saveTagsofStud} tags={this.state.savedTags} profile={profile} />) )
  }
  
  return (
    <div className='App'>
      <AppHeader />

      <input type="text" id="name-input" value={this.state.searchTerm} placeholder="Search by name" onChange = {this.handleInputChange} />
  
      <input type="text" id="tag-input" value={this.state.searchTag} placeholder="Search by tag" onChange = {this.handleTagInputChange} />

      <main className='profileList' style={{ padding: '2rem'}}>
        {profileJsx}
      </main>
      
    </div>
  )
};
}

export default App;
