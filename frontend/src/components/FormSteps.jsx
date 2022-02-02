
import React, { useEffect, useState, useRef } from 'react';
import "./styles/FormSteps.css";
import { FlexNoWrap } from "../components/styles/Flex.styled";

// import the progress bar
import StepProgressBar from 'react-step-progress';
// import the stylesheet
import 'react-step-progress/dist/index.css';

function FormSteps() {

  const imageUploadRef = useRef(null);
  const [image, setImage] = useState("");

  const fileUpload = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    const file = e.target.files[0]; // e.target.files -> returns Array of Objects.
    fileReader.readAsDataURL(file);
    fileReader.onload = ({ target: { result } }) => {
      setImage(result)
    }
    console.log(image)
  };

  // setup the step content
  const step1Content = <div className="add-item-main">
    <FlexNoWrap>
      <input type="button" name="lost" className="action-button" value="Lost" />
      <input type="button" name="found" className="action-button" value="Found" />
    </FlexNoWrap>
    <div>
      <label htmlFor="type">Choose a type:</label>
      <select name="type" id="type">
        <option value="keys">Keys</option>
        <option value="visa">Visa</option>
        <option value="picture">Picture</option>
        <option value="animal">Animal</option>
      </select>
    </div>
    <div>
      <label htmlFor="type">Write a description:</label>
      <input type="text" name="description" placeholder="description" />
    </div>
  </div>;
  const step2Content = <div className="add-item-main">
    <div>
      <label htmlFor="type">Choose location:</label>
      <select name="type" id="type">
        <option value="tel-aviv">Tel aviv</option>
        <option value="kfar-saba">Kfar saba</option>
        <option value="jerusalem">Jerusalem</option>
        <option value="holon">Holon</option>
        <option value="Bat Yam">Bat Yam</option>
      </select>
    </div>
    <div>
      <label htmlFor="type">Write a phone number:</label>
      <input type="phone" name="phone" placeholder="phone number" />
    </div>
  </div>;
  const step3Content = <div className="add-item-main">
    <input type="file" ref={imageUploadRef} id="mediaFile" accept="image/png, image/jpeg" onChange={fileUpload} />
    <div id="profile" onClick={() => imageUploadRef.current.click()} style={{ backgroundImage: "url(" + image + ")" }}>
      <div className="dashes"></div>
      <label className={image && "hasImage"}>Click to browse the item</label>
    </div>
  </div>;

  // setup step validators, will be called before proceeding to the next step

  function step1Validator() {
    // return a boolean

  }

  function step2Validator() {
    // return a boolean

  }

  function step3Validator() {
    // return a boolean
  }

  function onFormSubmit() {
    // handle the submit logic here
    // This function will be executed at the last step
    // when the submit button (next button in the previous steps) is pressed
  }

  // render the progress bar
  return (
    <StepProgressBar
      startingStep={0}
      onSubmit={onFormSubmit}
      steps={[
        {
          label: 'Description',
          name: 'step 1',
          content: step1Content,
          // validator: step1Validator
        },
        {
          label: 'Location',
          name: 'step 2',
          content: step2Content,
          // validator: step2Validator
        },
        {
          label: 'Image',
          name: 'step 3',
          content: step3Content,
          validator: step3Validator
        }
      ]}
    />
  )
}

export default FormSteps;


