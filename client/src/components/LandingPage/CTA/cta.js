import { login } from '../../../actions/auth';
import { Slide } from 'react-awesome-reveal';

export default function CTA() {
    return (
        <Slide triggerOnce>
        <section id="cta">
            <div className="cta-background">
                <div className="cta-content container color-primary-dark-2">
                    <h2 className="mb-2">Zarejestruj się już teraz</h2>
                    <p className="big mb-3">
                        Zredukuj liczbę zapomnianych spotkań do zera. Zajmie Ci to 2 minuty.
                    </p>
                    <a href="#" onClick={login} className="button-filled big">Zrób pierwszy krok</a>
                </div>
            </div>
        </section>
        </Slide>
    )
}