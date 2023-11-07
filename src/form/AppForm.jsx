import { Formik, Form, Field, ErrorMessage } from 'formik';

function AppForm(){
  return (
    <Formik
      initialValues={{ name: '',apellido:'', email: '',edad:'', message: '' }}
      validate={values => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Este campo es requerido';
        } else if(!values.email) {
          errors.email = 'Este campo es requerido';
        } else if(
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Direccion de correo invaliddo';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        let formData = new FormData();

        for (var key in values) {
          formData.append(key, values[key]);
        }
        fetch("https://formspree.io/f/mqkjpgqa", {
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        }).then(response => {
          setSubmitting(false);
          alert("Gracias por contactarme");
        });

      }}
    >
      {({ isSubmitting }) => (
        <Form className="form" >
          {/* <div className="caja">

          </div> */}

          <div>
            <label htmlFor="name">Nombre:</label>
            <Field type="text" name="name"  />
            <ErrorMessage name="name" component="div" />
          </div>

          <div>
            <label htmlFor="name">Apellido:</label>
            <Field type="text" name="apellido"  />
            <ErrorMessage name="apellido" component="div" />
          </div>

          <div>
            <label htmlFor="name">Edad:</label>
            <Field type="number" name="edad" />
            <ErrorMessage name="edad" component="div" />
          </div>
          
          <div>
            <label htmlFor="name">Correo:</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <label htmlFor="telefono">Telefono:</label>
            <Field type="text" name="telefono" />
            <ErrorMessage name="telefono" component="div" />
          </div>

          <div>
            <label htmlFor="message">Mensaje:</label>
            <Field component="textarea" name="message" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Enviar mensaje
          </button>
          <br />
        </Form>
      )}
    </Formik>
    
  )
}

export default AppForm;