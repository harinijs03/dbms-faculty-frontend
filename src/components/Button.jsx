import styles from './Button.module.css';

function Button({name, handler}) {
    return (
        <button type="button" className={styles.button} onClick={handler}>{name}</button>
    );
}

export default Button;