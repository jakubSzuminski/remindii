import { Link as OnpageLink } from 'react-scroll';
import { Fade } from 'react-awesome-reveal';

export default function Hero() {
    return (
        <Fade>
        <section id="hero">
            <div className="container">
                <div className="hero-text-content">
                    <h1 className="mb-3 lh-sm">Przypominaj klientom o wizytach</h1>
                    
                    <p className="big mb-3 lh-md">
                        Zautomatyzuj swój gabinet prowadząc tylko kalendarz Google i oczaruj klientów profesjonalizmem!
                    </p>
                
                    <div className="flex gap-2">
                        <OnpageLink to="offer" activeClass="active" spy={true} smooth={true} offset={-70} className="button big" href="#">Dlaczego warto?</OnpageLink>
                        <OnpageLink to="howitworks" activeClass="active" spy={true} smooth={true} offset={-70} className="button button-primary bold big cta" href="#">Jak to działa?</OnpageLink>
                    </div>
                </div>

                <div className="hero-image">
                    <video controls poster="visuals/video_poster.png">
                        <source src="visuals/video.mp4"/>
                    </video>
                </div>
            </div>     
        </section>
        </Fade>
    )
}