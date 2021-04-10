import styles from './ModalSuccess.module.scss'

export default function ModalSuccess({message, handleClose}) {
    return (
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <img src="music.svg" />
                </div>
                <div className={styles.modal_body}>
                    <p>
                        New NFT Lick has been created!
                    </p>
                    <p className={styles.bold}> {message} </p>

                    <button
                        type="button"
                        onClick={() => handleClose()}
                    >
                        <p>Ok</p>
                        <img src="check-circle-solid.svg" />
                    </button>
                </div>
            </div>
        </div>
    )
}