import styles from './ButtonPanel.module.css';
import Button from './Button'

function ButtonPanel({ names, handlers }) {
    return (
        <div className={styles.frame}>
            {
                names.map((name, index) => (
                    <Button key={index} name={name} handler={handlers[index]}></Button>
                ))
            }
        </div>
    );
}

export default ButtonPanel;