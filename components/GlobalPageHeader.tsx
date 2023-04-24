import { Box, Heading } from 'grommet'

interface GlobalPageHeaderProps {
  icon?: React.ReactNode
  title?: string
  subTitle?: string
}

const GlobalPageHeader: React.FC<GlobalPageHeaderProps> = ({
  title,
  icon,
  subTitle,
}) => {
  return (
    <Box pad="medium">
      <Box gap="small" direction="row" align="baseline">
        {icon && icon}
        <Heading
          margin={{
            horizontal: 'small',
            bottom: 'small',
            top: 'large',
          }}
          color="brand"
          level={1}
        >
          {title}
        </Heading>
      </Box>
      {subTitle && (
        <Heading
          color={{ light: 'dark-3', dark: 'light-3' }}
          margin={{ left: 'large', vertical: 'small' }}
          level={4}
        >
          {subTitle}
        </Heading>
      )}
    </Box>
  )
}

export default GlobalPageHeader
