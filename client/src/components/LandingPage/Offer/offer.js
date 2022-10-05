import { Link as OnpageLink } from 'react-scroll';
import { Fade } from 'react-awesome-reveal';

export default function Offer() {
    return (
        <Fade>
        <section id="offer">
            <div className="container-super-narrow">
                <h2 className="center mb-5">Dlaczego warto?</h2>
                <div className="offer-content-container">
                    <ul className="big mb-6">
                        <li>
                            <ion-icon name="checkmark-outline"></ion-icon>
                            <p>
                                redukcja "zapomnianych" wizyt do minimum
                            </p>
                        </li>
                        <li>
                            <ion-icon name="checkmark-outline"></ion-icon>
                            <p>
                                zwiększenie <span className="color-primary">zadowolenia</span> klienta z usługi
                            </p>
                        </li>
                        <li>
                            <ion-icon name="checkmark-outline"></ion-icon>
                            <p>
                                bardziej <span className="color-primary">profesjonalny</span> obraz gabinetu w oczach klienta
                            </p>
                        </li>
                        <li>
                            <ion-icon name="checkmark-outline"></ion-icon>
                            <p>
                                lepsza organizacja gabinetu
                            </p>
                        </li>
                    </ul>
                    <p className="big center mb-2 lh-md-2">
                    Dodatkowo, jesteśmy <span className="color-primary bold">super-łatwi</span> w obsłudze.
                    Ustawienie wszystkiego zajmie Ci nie więcej niż 2 minuty!
                    </p>

                    <OnpageLink to="howitworks" activeClass="active" spy={true} smooth={true} offset={-70} className="button button-primary big" href="#">Zobacz sam &rarr;</OnpageLink>
                </div>
            </div>
        </section>
        </Fade>
    )
}