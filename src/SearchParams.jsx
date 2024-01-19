import { useQuery } from '@tanstack/react-query';
import  fetchSearch  from "./fetchSearch";
import useBreedList from './useBreedList';
import Results from "./Results";
import { useContext, useState } from 'react';
import AdoptedPetContext from './AdoptedPetContext';

const ANIMALS =[ "bird", "cat", "dog", "rabbit", "reptile"];
const SearchParams = () => {
    const [adoptedPet] = useContext(AdoptedPetContext)
    const [animal, updateAnimal] = useState("");
    const [breeds] = useBreedList(animal);
   
    const [requestParams, setRequestParams] = useState({
        location: "",
        animal: "",
        breed: "",
    });

    const results = useQuery(["search", requestParams], fetchSearch);
    const pets = results?.data?.pets ?? [];

   

    // in jsx, under form, inside the larger div
    return (
        <div className="search-params">
            <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const obj = { 
                    animal: formData.get("animal") ?? "",
                    breed: formData.get("breed") ?? "",
                    location: formData.get("location") ?? "",
                };
                setRequestParams(obj);
            }}>
                { adoptedPet ? (<div className="pet image-container">
                    <img src={adoptedPet.images[0]}
                        alt={adoptedPet.name} />
                </div>): null}
                <label htmlFor="location">
                    Location
                    <input 
                        id="location" 
                       
                        placeholder="Location" 
                        name="location"
                        
                    />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        value={animal}
                        name="animal"
                        onChange={(e) => {
                            updateAnimal(e.target.value)
                            
                        }}
                        
                    >
                        <option />
                        {ANIMALS.map((animal) => (
                            <option key={animal} value={animal}>
                                {animal}
                            </option>
                        ))}

                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select
                        disabled={!breeds.length}
                        id="breed"
                        
                        name="breed"
                    >
                        <option />
                        {breeds.map((breed) => (
                            <option key={breed} value={breed}>
                                {breed}
                            </option>
                        ))}
                    </select>
                </label>
                <button>Submit</button>

            </form>
            <Results pets={pets} />;
        </div>
    )
}

export default SearchParams;