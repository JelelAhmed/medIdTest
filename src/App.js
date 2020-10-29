import React, {Component} from 'react';

import 'tachyons';
import SuggestionBox from './SuggestionBox';

const AllergyList = [
	{name: 'Drug Allergy', frequency: 2},
	{name: 'Food Allergy', frequency: 23},
	{name: 'Insect Allergy', frequency: 7},
	{name: 'Pollen Allergy', frequency: 30},
	{name: 'Pet Allergy', frequency: 9},
	{name: 'Mold Allergy', frequency: 2},
	{name: 'Latex Allergy', frequency: 3},

]

class App extends Component {

	state = {
		searchField: '',
		allergies: AllergyList,
		filteredAllergies: '',

		name: null,
		dateOfBirth: '',
		gender: '',
		frequency: null

	}

	sortedAllergies = this.state.allergies.sort((x, y) => {
		return ~(x.frequency - y.frequency);
	});

	onNameChange = (event) => {
		this.setState({name: event.target.value})
	}

	onDateChange = (event) => {
		this.setState({dateOfBirth: event.target.value})
	}

	onInputChange = (event) => {
		this.setState({searchField: event.target.value})
	}

	onGenderChanged = (event) => [
		this.setState({gender: event.target.value})
	]

	onSuggestionClicked = (allergy) => {
		this.setState({searchField: allergy});
	}

	onSubmit = (event) => {
		const { searchField, name, dateOfBirth, gender } = this.state;
		event.preventDefault();
		let allergyFrequency;

		AllergyList.forEach(item => {
			if (item.name.toLowerCase() === searchField.toLowerCase()) {
			return allergyFrequency = item.frequency;
		}});
	
	  const submittedForm = {
			name: name,
			dateOfBirth: dateOfBirth,
			gender: gender,
			allergy: {
				name: searchField,
				frequency: allergyFrequency
			} 
		}

		fetch('https://medid-test-screening.firebaseio.com/medIdTest.json', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(submittedForm)
		})
			.then(response  => response.json())
			.then(response => {
				console.log(response);
			})
			.catch(console.log)		
	}

  render() {
		const filteredAllergies = this.state.allergies.filter(allergy => {
			return allergy.name.toLowerCase().includes(this.state.searchField.toLowerCase())
		});

		const displayedAllergies = filteredAllergies.map((item) => {
			return item.name;
		});

		return (
			<div style={{display: 'flex', alignItems:'center', justifyContent:'center', marginTop:'4rem'}}>
				<form onSubmit={this.onSubmit}>
					<div>
						<input type="text"
										onChange={this.onNameChange}
										className='w5 ma1 pa3 ba b--green bg-lightest-blue' 
										placeholder="Full Name" 
										id="name" name='name' 
										required />
						<label htmlFor="name" className=''>Full Name</label>
					</div>

					<div className=''>
						<input type="date"
										onChange={this.onDateChange} 
										className='w4 ma1 pa3 ba b--green bg-lightest-blue' 
										id="date" name='date' 
										required/>
						<label htmlFor="date" className=''>Date of Birth</label>
					</div>

					<div className=''>
						<select onChange={this.onGenderChanged} name='gender' id='gender' className='w5 ma1 pa3 ba b--green bg-lightest-blue' required>
							<option >Select gender!!!</option>
							<option value='male'>Male</option>
							<option value='female'>Female</option>
						</select>
						<label htmlFor="gender" className=''>Gender</label>
					</div>

					<div className='pa2'>
						<h3>Allergies</h3>
						<input className='w5 pa3 ba b--green bg-lightest-blue'
										type='search'
										name='allergy'
										placeholder='input allergies'
										onChange={this.onInputChange}
										value={this.state.searchField}
										required />
						<label htmlFor="allergy" className=''></label>
					</div>

					<button type='submit' className='pa3 ma3 fs4 bg-blue'>Submit</button>
				</form>
				<div className='ma1 pa3 ba b--green bg-lightest-blue'>
					<SuggestionBox onSuggestionClicked={this.onSuggestionClicked} displayedAllergies={displayedAllergies} />
				</div>
			</div>
		)
	}
}

export default App;
