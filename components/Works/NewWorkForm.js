import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './NewWorkForm.module.sass';

function NewWorkForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const shortDescriptionInputRef = useRef();
  const descriptionInputRef = useRef();


  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredShortDescription = shortDescriptionInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;


    const workData = {
      title: enteredTitle,
      image: enteredImage,
      shortDescription: enteredShortDescription,
      description: enteredDescription,
    };

    props.onAddWork(workData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Work Title</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Work Image</label>
          <input type='text' required id='image' ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='shortDescription'>Short Description</label>
          <input type='text' required id='shortDescription' ref={shortDescriptionInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='5'
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Work</button>
        </div>
      </form>
    </Card>
  );
}

export default NewWorkForm;
