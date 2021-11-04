const showNotification = ({ self, type, menssage, title }) => {
  self.$notification[type]({
    message: title,
    description: menssage
  })
}

const menssageErrors = (err) => {
  if (
    err.errors !== undefined &&
    !(typeof err.errors === 'string' || err.errors instanceof String)
  ) {
    return err.errors.join(', ')
  } else {
    return 'server error'
  }
}

const mapCatch = (err, self) => {
  if (err.response) {
    const menssage = menssageErrors(err.response.data)
    showNotification({ self, type: 'warning', menssage, title: 'Error!' })
  } else {
    showNotification({
      self,
      type: 'warning',
      menssage: err.message,
      title: 'Error!'
    })
  }
  self.toggleSpinning(false)
}

module.exports = {
  showNotification,
  menssageErrors,
  mapCatch
}
