import styles from './ModalLoader.module.scss'

export default function ModalLoader({message, handleClose}) {
    return (
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <div className={styles.modal_body}>
                    <div className={styles.lds_roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    <p> {message} </p>
                </div>
            </div>
        </div>
    )
}