import {Button, Spinner} from 'react-bootstrap';
const Loader = () => {
  return (
    <>
    <div  className='text-center'>
    <span  disabled>
    <Spinner
    className='me-3'
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    <span className='fs-5'>Loading...</span>
  </span>
    </div>
    </>
  )
}

export default Loader





// function ButtonExample() {
//   return (
//     <>
//       <Button variant="primary" disabled>
//         <Spinner
//           as="span"
//           animation="border"
//           size="sm"
//           role="status"
//           aria-hidden="true"
//         />
//         <span className="visually-hidden">Loading...</span>
//       </Button>{' '}
     
//     </>
//   );
// }

// export default ButtonExample;