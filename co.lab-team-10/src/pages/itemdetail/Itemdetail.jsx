import React from 'react'
import Footer from '../../components/Footer'
import ItemCategories from '../../components/ItemCategories'
import Navigation from '../../components/Navigation'

function Itemdetail() {
  return (
    <div className='item-detail-page'>
      <Navigation />
      <ItemCategories />

      <header>
        <a href="">back to listing</a>
      </header>

      <section className='item-basic-info'>
        <img src="https://cdn.cort.com/cort/images/products/P1105478_main_400.jpg" alt="chair" width={100} height={100} />
        <div className="name-and-location">
          <h2>Item Name</h2>
          <h3>Item Location</h3>
        </div>
      </section>

      <section className="item-details">
        <h3>item detail</h3>
        <ul>
          <li>icon date posted</li>
          <li>icon weight</li>
          <li>icon condition</li>
        </ul>
      </section>

      <section className="item-description">
        <h3>description</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore aliquid nisi obcaecati assumenda tenetur ducimus, consectetur quam quisquam perferendis. Vero.</p>
      </section>

      <section className="contact-poster">
        <h3>posted by</h3>
        <div className="poster-info">
          <img src="https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528" alt="avatar" height={70} width={70} />
          <h3>username</h3>
          <h4>credibility rating</h4>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Itemdetail

// section (‘contact-poster’)
// h3 posted by
// div (‘poster-info)
// Img
// h2 poster name
// h4? credibility rating
// /div (‘poster-info)
// button-message poster
// /section (‘contact-poster’)
