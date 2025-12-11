import React, { useEffect, useRef, useState } from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { AsyncTypeahead, Typeahead } from "react-bootstrap-typeahead";

const api = "https://geo.vedicrishi.in/places";
const country = require("../utils/country2.json");

export default function Sample(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");
  const typeahead = useRef();
  const [selectedCountry, setCountry] = useState(
    props.default?.country || props.defaultPlace?.[0]?.country || ""
  );
  const [defaultPlace, setDefaultPlace] = useState(
    props.defaultPlace && props.defaultPlace[0]?.name ? props.defaultPlace : []
  );
  const typeaheadRef = useRef();

  const handleFocus = () => {
    typeaheadRef.current.clear();
    typeahead.current.clear();
    setCountry("");
  };

  const handleSearch = (query) => {
    if (!query) return; // Don't trigger search if query is empty
    setIsLoading(true); // Set loading state to true

    // Make the API call to fetch the places
    fetch(api, {
      method: "POST",
      headers: {
        Authorization:
          "Basic NjAxMjgwOjgxNjAwODk5YzkzOTA4N2Q5YTFjMjYxMDhkZjg2Mzk5", // Replace with your actual API key
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country: selectedCountry, name: query }),
    })
      .then((res) => res.json()) // Parse the response as JSON
      .then((data) => {
        if (Array.isArray(data)) {
          // Map the API response to the required options format
          const options = data.map((item) => ({
            country: item.country,
            lat: item.latitude,
            lon: item.longitude,
            place: item.place + ", " + item.country,
            id: item.place,
          }));
          setOptions(options); // Update the options state with the new places
        } else {
          setError("No match found"); // Set error if no matches are found
        }
        setIsLoading(false); // Set loading state to false when done
      })
      .catch((error) => {
        setError("Error fetching data"); // Handle any API errors
        setIsLoading(false); // Set loading state to false if there is an error
      });
  };

  const handleChange = (input) => {
    if (input.length > 0) {
      const place = input[0]; // Get the first selected option
      props.passdata(input[0]);
    }

    // if (Array.isArray(input) && input.length > 0) {
    //   props.passdata(input[0]);
    // }
  };
  const handleInputChange = (input) => {
    if (!input) {
      // If the input is cleared, pass empty data
      props.passdata({ lat: "", lon: "", place: "" });
    }
  };

  useEffect(() => {
    const defaultData = props.default || props.defaultPlace?.[0] || {};
    if (defaultData?.country !== undefined && defaultData.country !== "") {
      setCountry(defaultData.country);
    }
    if (defaultData?.name !== undefined && defaultData.name !== "") {
      setDefaultPlace([defaultData]);
    } else if (defaultData?.place !== undefined && defaultData.place !== "") {
      setDefaultPlace([{ place: defaultData.place, name: defaultData.place }]);
    } else {
      setDefaultPlace([]);
    }
  }, [props.default, props.defaultPlace]);

  useEffect(() => {
    if (props.clear) {
      typeahead.current.clear();
    }
  }, [props.clear]);

  const setSelectedCountry = (val) => {
    setCountry(val[0]?.name);
  };

  const filterBy = () => true;

  return (
    <div id="custom" className="flex w-full mt-2 items-start flex-col gap-3">
      {/* <label className={props.label_style ? props.label_style : "text-lg"}>
        {props.text ? `${props.text}:` : "Select Your Birth Place:"}
      </label> */}

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 sm:flex-row flex-col items-end">
        <div className="w-full">
          <Typeahead
            key={selectedCountry != "" ? selectedCountry : "United States"} // Key to force re-mount
            ref={typeaheadRef}
            className={`${
              props.dark
                ? props.fieldError
                  ? "box-input-dark border-red-500"
                  : "box-input-dark"
                : props.fieldError
                ? "box-input border-red-500"
                : "box-input"
            } !text-left`}
            id="country-typeahead"
            labelKey="name"
            onChange={setSelectedCountry}
            options={country}
            onFocus={handleFocus}
            defaultInputValue={selectedCountry}
            placeholder="Search for a country..."
            renderMenuItemChildren={(option, menuProps) => (
              <div>
                <div className="bg-white border border-zinc-300  border-t-0 w-full hover:border-sky-500 ">
                  <p className="text-[16px] cursor-pointer text-zinc-800  py-3 px-2 items-center hover:bg-sky-500 hover:text-white ">
                    {option?.emoji} {option?.name}
                  </p>
                </div>
              </div>
            )}
          />
        </div>
        <div className="w-full text-left md:col-span-2">
          <div className="w-full">
            <AsyncTypeahead
              key={
                defaultPlace.length > 0
                  ? defaultPlace[0].place || defaultPlace[0].name
                  : "empty"
              } // Key to force re-mount
              className={
                props.dark
                  ? props.fieldError
                    ? "box-input-dark border-red-500"
                    : "box-input-dark"
                  : props.fieldError
                  ? "box-input border-red-500"
                  : "box-input"
              }
              ref={typeahead}
              filterBy={filterBy}
              id="place"
              isLoading={isLoading}
              labelKey={(option) => {
                if (typeof option === "string") return option;
                return option?.place || option?.name || "";
              }}
              minLength={2}
              defaultSelected={defaultPlace}
              onChange={handleChange}
              onSearch={handleSearch}
              onInputChange={handleInputChange}
              options={options}
              placeholder="Type Birth City/District"
              renderMenuItemChildren={(option) => {
                const displayText =
                  typeof option === "string"
                    ? option
                    : option?.place || option?.name || "";
                return (
                  <div className="bg-white border border-zinc-300  border-t-0 w-full hover:border-[#0e1832] ">
                    <div className="text-[16px] cursor-pointer text-zinc-800  py-3 px-2 items-center hover:bg-[#f2e2a3] ">
                      {displayText}
                    </div>
                  </div>
                );
              }}
              // renderMenu={(results, menuProps, state) => {
              //   if (isLoading) {
              //     return (
              //       <div {...menuProps} className=" w-full">
              //         <div className="absolute right-0 -top-1">
              //           <Loader width="50px" height="50px" />
              //         </div>
              //       </div>
              //     );
              //   }
              //   return (
              //     <div className="w-full mt-10" {...menuProps}>
              //       {results.map((result, index) => (
              //         <button
              //           onChange={() => alert("sss")}
              //           key={index}
              //           type="button"
              //           className="bg-white  border border-zinc-300  border-t-0 w-full hover:border-[#0e1832]">
              //           <div className="text-[16px]  cursor-pointer text-zinc-800 py-3 px-2 items-center hover:bg-[#f2e2a3]">
              //             {result.place}
              //           </div>
              //         </button>
              //       ))}
              //       {results.length === 0 && (
              //         <div className="text-center text-zinc-800 w-full bg-white px-3 py-3">
              //           No results found
              //         </div>
              //       )}
              //     </div>
              //   );
              // }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
