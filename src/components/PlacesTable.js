import React from 'react';
import Loader from './Loader';

const PlacesTable = ({ places, loading }) => {
    if (loading) return <Loader />;
    if (!places || places.length === 0) return <div className="no-results">No results found</div>;

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Place Name</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {places.map((place, index) => (
                        <tr key={place.id}>
                            <td>{index + 1}</td>
                            <td>{place.city}</td>
                            <td>
                                <div className='country_box'>
                                    <img
                                        src={`https://flagsapi.com/${place.countryCode}/flat/64.png`}
                                        alt={place.country}
                                    />
                                    {place.country}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlacesTable;
