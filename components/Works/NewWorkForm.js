import { useRef, useState } from 'react';

import Card from '../UI/Card';
import classes from './NewWorkForm.module.sass';

function NewWorkForm(props) {
  const titleInputRef = useRef();
  const yearInputRef = useRef();
  const shortDescriptionInputRef = useRef();
  const descriptionInputRef = useRef();
  const roleInputRef = useRef();


  // State to hold the image URLs
  const [imageInputs, setImageInputs] = useState(['']);

  function addImageInputHandler() {
    setImageInputs((prevInputs) => [...prevInputs, '']);
  }

  function removeImageInputHandler(index) {
    setImageInputs((prevInputs) => prevInputs.filter((_, i) => i !== index));
  }

  function handleImageChange(index, event) {
    const newImageInputs = [...imageInputs];
    newImageInputs[index] = event.target.value;
    setImageInputs(newImageInputs);
  }

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredYear = yearInputRef.current.value;
    const enteredShortDescription = shortDescriptionInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredRole = roleInputRef.current.value;


    const workData = {
      title: enteredTitle,
      year: enteredYear,
      images: imageInputs, // Array of images
      shortDescription: enteredShortDescription,
      description: enteredDescription,
      role: enteredRole
    };

    props.onAddWork(workData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div>
          <label htmlFor='title'>Work Title</label>
          <input className={classes.control} type='text' required id='title' ref={titleInputRef} />
        </div>
        <br/>
        <div>
          <label htmlFor='year'>Work Year</label>
          <input className={classes.control} type='number' required id='year' ref={yearInputRef} />
        </div>
        <br/>
        <div>
          <label htmlFor='images'>Work Images</label>
          {imageInputs.map((image, index) => (
            <div key={index} >
              <input
                className={classes.control}
                type='text'
                required
                value={image}
                onChange={(event) => handleImageChange(index, event)}
              />
              <button type="button" onClick={() => removeImageInputHandler(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addImageInputHandler}>Add Another Image</button>
        </div>
        <br/>
        <div>
          <label htmlFor='shortDescription'>Short Description</label>
          <input className={classes.control} type='text' required id='shortDescription' ref={shortDescriptionInputRef} />
        </div>
        <br/>
        <div>
          <label htmlFor='description'>Description</label>
          <textarea
            className={classes.control}
            id='description'
            required
            rows='5'
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <br/>
        <div>
          <label htmlFor='role'>Role</label>
          <input className={classes.control} type='text' required id='role' ref={roleInputRef} />
        </div>
        <br/>
        <div className={classes.actions}>
          <button className={classes.control}>Add Work</button>
        </div>
      </form>
    </Card>
  );
}

export default NewWorkForm;
