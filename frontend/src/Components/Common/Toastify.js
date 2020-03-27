import React from 'react'
import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.min.css'


toast.configure()


class Toastify extends React.Component {
  notify = () => toast.success('Welcome back Jamie', {
    position: 'bottom-right',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  })


  render() {
    return <button className="button is-success" onClick={this.notify}>Login</button>
  }
}

export default Toastify