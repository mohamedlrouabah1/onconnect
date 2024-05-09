import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../../utils/api/APIUtils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlacesAutocomplete from "react-places-autocomplete";
import { LoadScript } from "@react-google-maps/api";
import "./Common.scss";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const UserForm = ({ userData, roleData }) => {
  const [jobSkills, setJobSkills] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const navigate = useNavigate();
  const handleCityChange = (address) => {
    setCity(address);
  };

  const handleCitySelect = async (address) => {
    // Sépare l'adresse en utilisant la virgule comme séparateur
    const addressParts = address.split(", ");
    // Récupère uniquement le premier élément (le nom de la ville)
    const cityName = addressParts[0];

    setCity(cityName);
  };

  const handleCountryChange = (address) => {
    setCountry(address);
  };

  const handleCountrySelect = async (address) => {
    setCountry(address);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   const signupRequest = {
  //     ...userData,
  //     roleData,
  //     jobSkills,
  //     phone,
  //     city,
  //     country,
  //     github,
  //     website,
  //     birthDate,
  //   };

  //   signup(signupRequest)
  //     .then(() => {
  //       toast.success("You're successfully registered. You can Login now!");
  //       navigate("/login");
  //     })
  //     .catch((error) => {
  //       toast.error(
  //         (error && error.message) ||
  //           "Oops! Something went wrong. Please try again!"
  //       );
  //     });
  // };
  const libraries = ["places"];

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBealtqk7g2OCR4Wi6N_9-hNi3vJdnrmGE"
      libraries={libraries}
    >
      <div className="common-form-container">
        <div className="common-form-content">
          <h1 className="common-form-title">Developer Registration</h1>
          {/* <form onSubmit={handleSubmit}> */}
          <div className="form-item">
            <input
              type="text"
              name="jobSkills"
              className="form-control"
              placeholder="Job Skills"
              value={jobSkills}
              onChange={(event) => setJobSkills(event.target.value)}
              required
            />
          </div>
          <div className="form-item">
            <PhoneInput
              country={"us"}
              value={phone}
              onChange={setPhone}
              placeholder="Phone"
              required
            />
          </div>
          <div className="form-item">
            <PlacesAutocomplete
              value={city}
              onChange={handleCityChange}
              onSelect={handleCitySelect}
              searchOptions={{ types: ["locality"] }}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "City",
                      className: "form-control",
                    })}
                    required
                  />
                  <div>
                    {loading ? <div>Loading...</div> : null}
                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active ? "#fafafa" : "#fff",
                      };
                      // Sépare la suggestion en utilisant la virgule comme séparateur
                      const suggestionParts =
                        suggestion.description.split(", ");
                      // Récupère uniquement le premier élément (le nom de la ville)
                      const cityName = suggestionParts[0];

                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, { style })}
                          key={suggestion.placeId}
                        >
                          {cityName}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>

          <div className="form-item">
            <PlacesAutocomplete
              value={country}
              onChange={handleCountryChange}
              onSelect={handleCountrySelect}
              searchOptions={{ types: ["country"] }}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Country",
                      className: "form-control",
                      required: true,
                    })}
                  />
                  <div>
                    {loading ? <div>Loading...</div> : null}
                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active ? "#fafafa" : "#fff",
                      };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, { style })}
                          key={suggestion.placeId}
                        >
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>

          <div className="form-item">
            <input
              type="url"
              name="github"
              className="form-control"
              placeholder="Github"
              value={github}
              onChange={(event) => setGithub(event.target.value)}
            />
          </div>
          <div className="form-item">
            <input
              type="url"
              name="website"
              className="form-control"
              placeholder="Website"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </div>
          <div className="form-item">
            <input
              type="date"
              name="birthDate"
              className="form-control"
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
              required
            />
          </div>
          <div className="form-item">
            <button type="submit" className="btn btn-block btn-primary">
              Register
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </LoadScript>
  );
};

export default UserForm;
