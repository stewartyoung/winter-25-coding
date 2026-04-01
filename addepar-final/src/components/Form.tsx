function Form() {
    const alertFormAction = (formData: FormData) => {
        alert("You typed: " + formData.get("name"))
    }

    return (
        <form action={alertFormAction}>
            <input type="text" name="name" />
            <button type="submit">Submit</button>
        </form>
    )
}

export default Form;