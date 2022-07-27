const ErrorMessage = () => {
    const styles = {
        display: 'block',
        width: '250px',
        height: '250px',
        objectFit: 'contain',
        margin: '0 auto'
    }
    return (
        <img style={styles} src={process.env.PUBLIC_URL + '/error.gif'} alt="Error." />
    )
}

export default ErrorMessage;