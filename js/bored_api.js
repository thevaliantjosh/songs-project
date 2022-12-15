//
//
//
// const bored_api = 'https://www.boredapi.com/api/activity'
//
// fetch(bored_api)
//     .then(response => {
//         return response.json()
//     })
//     .then((data) => {
//         console.log(data);
//         console.log(`You could ${data.activity}`)
//     })
//     .catch((error)=>{
//         console.error(error);
//     });


// console.log(`You could ${response.data.activity}`);

//Using async/await

const getActivity = async () => {
   try {
        const bored_api = `https://www.boredapi.com/api/activity`;
        const response = await fetch(bored_api);
        console.log(response.ok)
        const data = await response.json();
        console.log(data);
        return data
    } catch(error) {
        console.error(error)
    }
};

const data = getActivity().then((data)=> console.log(data));
