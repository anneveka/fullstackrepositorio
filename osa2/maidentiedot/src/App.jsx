import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    const [search, setSearch] = useState("");
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios
            .get("https://studies.cs.helsinki.fi/restcountries/api/all")
            .then((response) => {
                console.log(response.data);
                setCountries(response.data);
            });
    }, []);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div>
            <div>
                find countries <input value={search} onChange={handleSearch} />
            </div>
            <div>
                {filteredCountries.length > 10 && (
                    <p>Too many matches, specify another filter</p>
                )}
                {filteredCountries.length > 1 &&
                    filteredCountries.length <= 10 && (
                        <ul>
                            {filteredCountries.map((country) => (
                                <li key={country.name.common}>
                                    {country.name.common}&nbsp;
                                    <button
                                        onClick={() =>
                                            setSearch(country.name.common)
                                        }
                                    >
                                        Show
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                {filteredCountries.length === 1 && (
                    <div>
                        <h1>{filteredCountries[0].name.common}</h1>
                        <p>Capital {filteredCountries[0].capital}</p>
                        <p>Area {filteredCountries[0].area}</p>

                        <h2>Languages</h2>
                        <ul>
                            {Object.values(filteredCountries[0].languages).map(
                                (language) => (
                                    <li key={language}>{language}</li>
                                ),
                            )}
                        </ul>

                        <img
                            src={filteredCountries[0].flags.png}
                            alt={`Flag of ${filteredCountries[0].name.common}`}
                            width="150"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
