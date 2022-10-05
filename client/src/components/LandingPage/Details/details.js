import { Fade } from 'react-awesome-reveal';

const Details = () => {
    return (
        <Fade>
        <section id="details">
            <div className="container">
                <h2 className="mb-3">Szczegóły</h2>
                <ol>
                    <li>Możesz anulować subskrypcję w dowolnym momencie</li>
                    <li>Nasze wiadomości wysyłają się dzień przed umówioną wizytą</li>
                    <li>Treść Twojej wiadomości przypominającej musi zawierać 20-160 znaków</li>
                    <li>Możesz użyć tagów !data! i !godz! aby wykorzystać w SMSie datę i godzinę</li>
                    <li>W swoim panelu możesz zobaczyć historię wysłanych przez nas wiadomości</li>
                    <li>Przy pierwszym logowaniu musisz udzielić nam dostępu do kalendarza Google</li>
                </ol>
            </div>
        </section>
        </Fade>
    )
}

export default Details;