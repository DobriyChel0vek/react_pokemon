import styles from "./header.module.css"

const Header = () => {
    return (
        <header className = {styles['HeaderContainer']}>
            <div className={styles['logo h1']}>
                    <h1>Pokemons</h1>
                </div>
            <nav>
                <ul className={styles['button']}>
                    <button>About Us</button>
                    <button>Sign in</button>
                    <button>Sign Up</button>
                </ul>
            </nav>
        </header>
    );
};

export default Header;