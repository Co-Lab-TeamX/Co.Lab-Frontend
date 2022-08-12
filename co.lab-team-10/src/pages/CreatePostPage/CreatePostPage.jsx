import { Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [location, setLocation] = useState('Brooklyn');
  const [pickupType, setPickupType] = useState('scheduled-pickup');
  const [address, setAddress] = useState('');
  const [weight, setWeight] = useState('');

  function handleSubmit(e) {
    e.preventDefault()

    const postData = {
      title,
      description,
      photo,
      location,
      pickupType,
      address,
      weight
    }

    console.log(postData);
  }

  return (
    <div>
      <Navbar />
      <Button className="back-to-listing" >Back to listing</Button>

      <div className="post-page-header">
        Post Item
      </div>

      <form action="" onSubmit={handleSubmit}>
        <Grid container>

          <Grid item xs='12'>
            <label htmlFor="title">Item Title</label>
            <input type="text" id='title' required onChange={e => setTitle(e.target.value)} />
          </Grid>

          <Grid item xs='12'>
            <label htmlFor="description">Item Description - Max 1000 Characters</label>
            <textarea id='description' required rows="4" cols="50" onChange={e => setDescription(e.target.value)} />
          </Grid>

          <Grid item xs='12'>
            <label htmlFor="photos">Photos</label>
            <input type="file" id="photos" accept="image/*" required onChange={e => setPhoto(e.target.value)} />
          </Grid>

          {/* video */}


          <Grid item xs='12'>
            <label htmlFor="location">Location</label>
            <select id="location" required onChange={e => setLocation(e.target.value)}>
              <option value="Brooklyn">Brooklyn</option>
              <option value="Queens">Queens</option>
              <option value="Manhattan">Manhattan</option>
              <option value="The Bronx">The Bronx</option>
              <option value="Staten Island">Staten Island</option>
            </select>
          </Grid>

          <Grid item xs='12'>
            <label htmlFor="pickup-type">Pickup Type</label>
            <select id="pickup-type" required onChange={e => setPickupType(e.target.value)}>
              <option value="scheduled-pickup">Scheduled Pickup</option>
              <option value="immediate-pickup">Immediate Pickup</option>
            </select>
          </Grid>

          {/* if pickup is immediate ask for address */}
          {pickupType === 'immediate-pickup' && (
            <Grid item xs='12'>
              <label htmlFor="address">Address</label>
              <input type="text" id='address' required onChange={e => setAddress(e.target.value)} />
            </Grid>
          )}

          <Grid item xs='12'>
            <label htmlFor="weight">Weight (lbs)</label>
            <input type="number" id='weight' onChange={e => setWeight(e.target.value)} />
          </Grid>

          {/* <div className="length-widith-height"></div> */}

          <button type="submit">submit</button>
        </Grid>
      </form>
    </div>
  )
}
