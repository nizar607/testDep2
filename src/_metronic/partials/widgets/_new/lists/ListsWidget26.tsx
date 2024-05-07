import {Fragment} from 'react'
import {KTIcon} from '../../../../helpers'

type Props = {
  className: string
}

// Assuming KTIcon has specific icons for social media platforms
const socialMediaLinks: Array<{description: string, icon: string, link: string}> = [
  {description: 'Instagram', icon: 'instagram', link: 'https://www.instagram.com/'},
  {description: 'Facebook', icon: 'facebook', link: 'https://www.facebook.com/'},
  {description: 'TikTok', icon: 'tiktok', link: 'https://www.tiktok.com/'},
]

const ListsWidget26 = ({className}: Props) => (
  <div className={`card card-flush ${className}`}>
    <div className='card-header pt-5'>
      <h3 className='card-title text-gray-800 fw-bold'>LinkUp Tournament</h3>
      <div className='card-toolbar'></div>
    </div>
    <div className='card-body pt-5'>
      {socialMediaLinks.map((social, index) => (
        <Fragment key={`social-link-${index}`}>
          <div className='d-flex flex-stack'>
            {/* Social Media Icon */}
            <div className='d-flex align-items-center'>
              <KTIcon iconName={social.icon} className='fs-3 me-2' />
              <a href={social.link} className='text-primary fw-semibold fs-6' target="_blank" rel="noopener noreferrer">
                {social.description}
              </a>
            </div>

            {/* External Link Icon */}
            <button
              type='button'
              className='btn btn-icon btn-sm h-auto btn-color-gray-400 btn-active-color-primary justify-content-end'
              onClick={() => window.open(social.link, '_blank')}
            >
              <KTIcon iconName='exit-right-corner' className='fs-2' />
            </button>
          </div>
          {socialMediaLinks.length - 1 > index && <div className='separator separator-dashed my-3' />}
        </Fragment>
      ))}
    </div>
  </div>
)
export {ListsWidget26}
