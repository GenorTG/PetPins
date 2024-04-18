import axios from 'axios'

export const pixabayCategoryImg = async (query) => {
    const apiKEY = import.meta.env.VITE_PIXABAY_API_KEY
    const searchURL = `https://pixabay.com/api/?key=${apiKEY}=${query}&image_type=photo&min_width=200`
    return axios.get(searchURL)
        .then((response) => {
            let rdmRslt = Math.floor(Math.random() * (response.data.hits.length -1)) 

            const result = response.data.hits[rdmRslt]?.webformatURL
            if (result) {
                return result
            }
        
        })
        .catch((error) => console.log(error))
}

export const categories = [
    {
        name: 'Dogs',
        image: 'animal+dog'
    },
    {
        name: 'Cats',
        image: 'cat'
    },
    {
        name: 'Birds',
        image: 'bird'
    },
    {
        name: 'Reptiles',
        image: 'lizard'
    },
    {
        name: 'Horses',
        image: 'horse'
    },
    {
        name: 'Aquatic',
        image: 'fish'
    },
    {
        name: 'Exotic',
        image: 'exotic+animal'
    },
    {
        name: 'Other',
        image: 'random'
    },
]

export const userQuery = (userID) => {
    const query = `*[_type == "user" && _id == "${userID}"]`

    return query
}


// possibly bad image query here. To fix later in the course.
export const pinDetailQuery = (pinId) => {
    const query = `*[_type == "pin" && _id == '${pinId}']{
      image{
        asset->{
          url
        }
      },
      _id,
      title, 
      about,
      category,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
     save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      }
    }`
    return query
}

// same as pinDetailQuery
export const pinDetailMorePinQuery = (pin) => {
    const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`
    return query
}

export const searchQuery = (searchTerm) => {
    const query = `*[_type == "pin" && (title match '${searchTerm}' || category match '${searchTerm}' || about match '${searchTerm}')]{
        image,
        _id,
        destination,
        postedBy -> {
            _id,
            userName,
            image
        },
        save[] {
            _key,
            postedBy -> {
                _id,
                userName,
                image
            }
        }
    }`

    return query
}

export const feedQuery = `*[_type == 'pin'] | order(_createAt desc){
    image,
    _id,
    destination,
    postedBy -> {
        _id,
        userName,
        image
    },
    save[] {
        _key,
        postedBy -> {
            _id,
            userName,
            image
        },
    },
}`

// posible bad image query
export const userCreatedPinsQuery = (userID) => {
    const query = `*[ _type == 'pin' && userID == '${userID}'] | order(_createdAt desc){
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`
    return query
}

// posible bad image query
export const userSavedPinsQuery = (userID) => {
    const query = `*[_type == 'pin' && '${userID}' in save[].userID ] | order(_createdAt desc) {
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`
    return query
}