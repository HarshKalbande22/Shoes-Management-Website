let wrapper=document.getElementById("wrapper");
let post1Inputvalue=document.getElementById("post1");
let post2Inputvalue=document.getElementById("post2");
let post=document.getElementById("post");


axios.get('http://127.0.0.1:3000/products').then(((response)=>{
    console.log(response.data);
    const data=response.data;
    let template='';
    
   data.forEach((d)=>{
      template+=`<div><h1>${d.name}</h1><p>${d.famous}</p><button onclick="deletePost(${d.id})">Delete</button></div>`
   })
   wrapper.innerHTML=template;

}))

// post.addEventListener("click",()=>{
//    const post1=post1Inputvalue.value;
//    const post2=post2Inputvalue.value;
//    const payload={
//       name:post1,
//       famous:post2,
//    };
// axios.post('http://127.0.0.1:3002/cities',payload).then((response)=>{
// console.log(response.data);
// location.reload();
//    });
// });

// const deletePost=(id)=>{
// axios.delete(`http://127.0.0.1:3002/cities/${id}`).then((response)=>{
//    console.log(response.data);
//    const data=response.data
// })
// }