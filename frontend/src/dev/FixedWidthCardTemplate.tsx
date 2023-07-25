import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { CreateButton, DeleteButton, EditButton, ExportButton, ShowButton } from "react-admin";
import { useState } from "react";

export const FixedWidthCardTemplate = () => {

  /*vtl
  #if (!$card.itemsVariableName)
  const [cardData, setCardData] = useState<${card.itemType}>();
  #set($dataVariable = "cardData")
  #else
  #set($dataVariable = $card.itemsVariableName)
  #end
  */
  /*vtl #if (false)*/ useState(); /*vtl #end */

  return (
    <Card sx={{minWidth: 360, maxWidth: 600, /*vtl #if ($card.solid) color: 'common.white', backgroundColor: 'primary.main' #end */}} /*vtl #if ($card.outlined) variant="outlined" #end */>
      <CardContent>
        {/*vtl #if($card.titleProperty) */}
        <Typography variant="h4" component="div">
          {/*vtl {$dataVariable?.${card.titleProperty.name}} */}
        </Typography>
        {/*vtl #end */}
        {/*vtl #if($card.subTitleProperty) */}
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {/*vtl {$dataVariable?.${card.subTitleProperty.name}} */}
        </Typography>
        {/*vtl #end */}

        {/*vtl #foreach($property in $card.itemProperties) */}
          {/*vtl #if (!$property.asTitle && !$property.asSubTitle) */}
            {/*vtl #if ($card.labelPosition == 'hidden') */}
              <Typography mr={1} component="span">{/*vtl {$dataVariable?.${property.name}} */}</Typography>
            {/*vtl #elseif ($card.labelPosition == 'top') */}
              <Typography variant="caption">{/*vtl ${property.label} */}</Typography>
              <Typography mb={1} component="p">{/*vtl {$dataVariable?.${property.name}} */}</Typography>
            {/*vtl #elseif ($card.labelPosition == 'inline') */}
              <Typography component="p">
                {/*vtl ${property.label} */}: <Box component="span" sx={{fontWeight: "bold"}}>{/*vtl {$dataVariable?.${property.name}} */}</Box>
              </Typography>
            {/*vtl #end */}
          {/*vtl #end */}
        {/*vtl #end */}
      </CardContent>
      {/*vtl #if ($card.actions.size() > 0)*/}
      <CardActions>
        {/*vtl #foreach($action in $card.actions) */}
        {/*vtl #if($action.type == 'show') */}
        <ShowButton /*vtl label="$action.label"*/ /*vtl record={$dataVariable}*/ onClick={() => {alert('TODO: specify resource or implement custom show logic')}}/>
        {/*vtl #elseif ($action.type == 'edit') */}
        <EditButton /*vtl label="$action.label"*/ /*vtl record={$dataVariable}*/ onClick={() => {alert('TODO: specify resource or implement custom edit logic')}} />
        {/*vtl #elseif ($action.type == 'delete') */}
        <DeleteButton /*vtl label="$action.label"*/ /*vtl record={$dataVariable}*/ onClick={() => {alert('TODO: specify resource or implement custom delete logic')}} />
        {/*vtl #elseif ($action.type == 'custom') */}
        <Button onClick={() => {alert('TODO: implement custom action logic')}}>{/*vtl $action.label */}</Button>
        {/*vtl #end */}
        {/*vtl #end */}
      </CardActions>
      {/*vtl #end */}
    </Card>
  )
}