import React, { useState, useEffect } from 'react';
import serverController from '../../serverController';
import { Link } from 'react-router-dom';

const Property = (props) => {
	const [ propertyData, setPropertyData ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	let li = null;

	useEffect(
		() => {
			async function fetchData() {
				try {
					setLoading(true);
					// if (!props.match.params.page.match(/^\d+$/)) throw Error("invalid page id");
					// const offset = parseInt(props.match.params.page) * 20;
                    const {data: resData} = await serverController.getAllProperty();
					setPropertyData(resData);
					setLoading(false);
				} catch (e) {
					setLoading(false);
				}
			}
			fetchData();
		},
		[ props.match.params.page ]
	);

	const buildListItem = (property) => {
		const propertyId = property._id
		return (
			<li key={propertyId}>
				    <Link to={`/property/${propertyId}`}>{property.title}</Link>
                    &nbsp;&nbsp;<Link to={`/account/property/${propertyId}`}>Edit</Link>
                    &nbsp;&nbsp;<button>Delete</button>
			</li>
		);
	};

	li = propertyData &&
        propertyData.map((property) => {
			return buildListItem(property);
		 });
	
	// let preLink = linkData.preLink ? (<Link className='pre-link' to={(parseInt(props.match.params.page) - 1).toString()}> Previous </Link>) : "";
	// let nextLink = linkData.nextLink ? (<Link className='next-link' to={(parseInt(props.match.params.page) + 1).toString()}> Next </Link>) : "";
		
	if (loading) {
		return (
			<div className='show-body'>
				<p>loading...</p>
			</div>
		);
	}

	if (!(Array.isArray(propertyData) && propertyData.length)) {
		return (
			<div className='show-body'>
				<p>404 - Property List Not Found!</p>
			</div>
		);
	}

	return (
		<div className='show-body'>
			<ul className='list-unstyled'>{li}</ul>
            <Link to='/account/property/add'>Add a new one</Link>
		</div>
    );
    
};

export default Property;
