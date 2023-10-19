import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles({
  '.super-app-theme--header': {
    backgroundColor: '#DEEDFE'
  },
  blue: {
    color: '#0A6EE1'
  }
})

export const tableStyle = {
  height: 500,
  width: '100%',
  '& .actions': {
    color: 'text.secondary'
  },
  '& .textPrimary': {
    color: 'text.primary'
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#DEEDFE',
    fontSize: 16,
    color: '#0A6EE1'
  },

  //Custom page
  '& .MuiPaginationItem-root': {
    color: '#000'
  },
  '& li .Mui-selected': {
    color: 'white',
    backgroundColor: '#0A6EE1'
  },
  '& li .Mui-selected:hover': {
    color: 'white',
    backgroundColor: '#0757b3'
  },

  //Disable select all
  '& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer':
    {
      display: 'none'
    }
}
