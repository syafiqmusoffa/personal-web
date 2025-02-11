let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// let doubleNumber = []

let result = 0



// 1. forEach

// function showNumber(number) {
//   console.log(`sekarang nomor ${number}`)

//   result <= number
// }

// numbers.forEach(showNumber)

// console.log(result)


// numbers.forEach((number) => {
//   doubleNumber.push(number *2)
// })

// console.log(doubleNumber)

// 2. MAP
// numbers.map((number) => {
//     return number *2
//   }
// )

// const doubleNumber = numbers.map((number) => {
//   return number * 2
// })

// console.log(doubleNumber)

// doubleNumber.forEach((doubleNumber) =>{
//   result += doubleNumber
// })

// console.log(result)

// console.log(numbers)

// 3. FILTER

// const candidates = [
//   {
//     name: "A",
//     score: 70,
//     expectedSalary: 500,
//     prefferedPosition: "Frontend"
//   },
//   {
//     name: "B",
//     score: 40,
//     expectedSalary: 200,
//     prefferedPosition: "Fullstack"
//   },
//   {
//     name: "C",
//     score: 90,
//     expectedSalary: 900,
//     prefferedPosition: "Fullstack"
//   },
//   {
//     name: "D",
//     score: 80,
//     expectedSalary: 700,
//     prefferedPosition: "Fullstack"
//   }
// ]

// const criteria = {
//   score: 70,
//   expectedSalary: 1000,
//   prefferedPosition: "Fullstack"
// }

// const passCandidates = candidates.filter((candidate) => {
//   if(candidate.score >= criteria.score && 
//     candidate.expectedSalary <= criteria.expectedSalary && 
//     candidate.prefferedPosition === criteria.prefferedPosition
//   ) return true;

//   return false
// })

// console.log(passCandidates)

// 4. REDUCE
const sum = numbers.reduce((previous, current) => {
  console.log("previous :", previous)
  console.log("current :", current)
  console.log("previous - current =", previous - current)
  return previous - current
})

console.log(sum)



// function fetchTestimonials() {
//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
  
//       xhr.open("GET", "https://api.npoint.io/37b03059009dda95802a", true);
  
//       xhr.onload = function () {
//         if (xhr.status === 200) {
//           const response = JSON.parse(xhr.responseText);
//           // console.log("Response :", response);
  
//           resolve(response.testimonials);
//         } else {
//           // console.error("Error :", xhr.status);
//           reject("Error :", xhr.status);
//         }
//       };
//       xhr.onerror = () => reject("network error");
  
//       xhr.send();
//     });
//   }
  
//   const testimonialsContainer = document.getElementById("testimonialsContainer");
  
//   const testimonialsHTML = (array) => {
//     return array
//       .map(
//         (testimonial) => `
//           <article>
//             <img src="${testimonial.image}" alt="testimonial-image" />
//             <p class="testimonial-item-caption">"${testimonial.caption}"</p>
//             <p style="text-align: right">- ${testimonial.author}</p>
//             <p style="text-align: right; font-weight: bold">${testimonial.rating}★</p>
//           </article>
//           `
//       )
//       .join("");
//   };
  
//   async function showAllTestimonials() {
//     const testimonials = await fetchTestimonials();
//     console.log(testimonials);
//     testimonialsContainer.innerHTML = testimonialsHTML(testimonials);
//   }
  
//   showAllTestimonials();
  
//   async function filterTestimonialsByStar(rating) {
//     const testimonials = await fetchTestimonials();
  
//     const filteredTestimonials = testimonials.filter(
//       (testimonial) => testimonial.rating === rating
//     );
  
//     console.log(filteredTestimonials);
  
//     if (filteredTestimonials.length === 0) {
//       return (testimonialsContainer.innerHTML = `<p>No testimonials.</p>`);
//     }
  
//     testimonialsContainer.innerHTML = testimonialsHTML(filteredTestimonials);
//   }