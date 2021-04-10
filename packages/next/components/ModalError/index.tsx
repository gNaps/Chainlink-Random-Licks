import styles from './ModalError.module.scss'

export default function ModalError({message, handleClose}) {
    return (
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    {/* <i class="fas fa-times-circle fa-3x" /> */}
                    <img src='/times-solid.svg' />
                </div>
                <div className={styles.modal_body}>
                    <p>
                        {message}
                    </p>

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