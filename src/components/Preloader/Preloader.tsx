import TenshiSpinner from '../TenshiSpinner/TenshiSpinner'

const Preloader = (): JSX.Element => {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <TenshiSpinner />
    </div>
  )
}

export default Preloader
