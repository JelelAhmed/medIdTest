import React from 'react';
import 'tachyons'

const suggestionBox = (props) => {
	return (
		<div>
			<div>
			  <h2>Suggestion Box</h2>
				<div className='ma1 bg-white pa1 b2'>
	        {props.displayedAllergies.map((item) => {
						return <p key={item} 
											className='cp tc w4 bg-green br3 pa1 grow'
											onClick={() => props.onSuggestionClicked(`${item}`)}>
											{item}
										</p>
					})}
				</div>
			</div>
		</div>

	);
}

export default suggestionBox;
