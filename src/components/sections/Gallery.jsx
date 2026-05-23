import Container from '../layout/Container'
import SectionHeader from '../ui/SectionHeader'
import ImageGalleryGrid from '../ui/ImageGalleryGrid'
import { galleryImages } from '../../data/properties'

export default function Gallery() {
  return (
    <section id="galerie" className="bg-beige-100 py-20 sm:py-28">
      <Container>
        <SectionHeader
          label="Galerie"
          title="L&apos;élégance dans chaque détail"
          description="Intérieurs raffinés, espaces lumineux et finitions haut de gamme — découvrez l'univers de nos propriétés."
        />

        <ImageGalleryGrid images={galleryImages} />
      </Container>
    </section>
  )
}
