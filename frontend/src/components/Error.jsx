import { Alert } from "react-bootstrap"

const Error = ( {children , varient ="danger"}) => {
  return (
    <Alert variant={varient}className="text-center">{children}</Alert>
  )
}

export default Error