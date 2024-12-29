import { ContentContainer } from '@shared/components/Public/ContentContainer'
import { Typography } from '@shared/components/Public/Typograpy'
import { AutoGrid } from '@shared/components/Container/AutoGrid'
import { Feature } from '@shared/components/Public/Feature'
import { Hero } from '@shared/components/Public/Hero'
import { FEATURES } from '@shared/data/public'

export default function Home() {
  return (
    <>
      <Hero />
      <ContentContainer>
        <Typography>
          Por qué Elegirnos
        </Typography>

        <AutoGrid
          columnMinWidth='33%'
          margin="0px 0px 100px 0px"
        >
          {FEATURES.map((feature) => (
            <Feature
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </AutoGrid>

        <Typography>
          Donde estamos ubicados
        </Typography>


        <div
          className='center-box-container'
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.0032567358394!2d-69.84639882406525!3d18.52875496892277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf8714b5340cfd%3A0xa6f8e0119a2bcd5b!2sSuplidora%20Hern%C3%A1ndez%20Ure%C3%B1a%20S.R.L!5e0!3m2!1ses!2sdo!4v1730517370426!5m2!1ses!2sdo"
            width="600"
            height="450"
            loading="lazy"
            style={{
              border: 0,
              width: '100%',
              height: '400px',
              borderRadius: '8px'
            }}
          />
        </div>
      </ContentContainer>
    </>
  )
}
