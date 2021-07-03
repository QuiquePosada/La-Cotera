import React, { useState, useEffect } from 'react';
import { 
  // Flex, 
  Typography, 
  DisplayText, 
  SectionHeading, 
  Paragraph, 
  RadioButtonField,
  TextInput,
  Textarea,
  FieldGroup, 
  Spinner,
  Notification,
  Button,
  SkeletonContainer,
  SkeletonImage,
  Modal,
  Card,
  EmptyState,
  List,
  Pill,
  Icon,
  HelpText,
  Dropdown,
  DropdownList,
  DropdownListItem,
  // Autocomplete 
} from '@contentful/forma-36-react-components';
import { EditorExtensionSDK } from '@contentful/app-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import '../index.css';
import { useDropzone } from 'react-dropzone';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  // width: 100,
  // height: 100,
  // width: 200,
  height: 200,
  padding: 4,
  // boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const imgStyle = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


interface EditorProps {
  sdk: EditorExtensionSDK;
}

// for the inital release version
// interface AppState {
//   title?: string;
//   body?: string;
//   hasAbstract: boolean;
//   abstract?: string;
// }

// Ganado en Venta


// const CONTENT_FIELD_NAME:string = 'name';
// const CONTENT_FIELD_ID:string = 'onSale'; // boolean value
// const CONTENT_AVATAR:string = 'image';
// const CONTENT_FIELD_BODY:string = 'body';
// const CONTENT_FIELD_GALLERY:string = 'multImg';
// const CONTENT_FIELD_DEPENDENT:string[] = ['price']; // dependent variables to show/hide (conditional)

/**
 * This is a custom entry only used for specific fields for managing cows, this is not to be used in a generalized manner
 *  (cause it won't work)
 * @param props EditorProps (from the Contentful sdk)
 * @returns custom entry for managing cows
 */
const Entry = (props: EditorProps) => {
  const { sdk } = props;
  // text fields
  const nameField = sdk.entry.fields.name;
  const sireField = sdk.entry.fields.sire;
  const bodyField = sdk.entry.fields.body;
  // boolean fields
  const isOnSaleField = sdk.entry.fields.onSale;
  const isHistoricField = sdk.entry.fields.isHistoric;
  const isGreatestCowField = sdk.entry.fields.isGreatestCow;
  const isOnMainSiteField = sdk.entry.fields.isFeatured;
  // image fields
  const mainImgField = sdk.entry.fields.image;
  const imgGalleryField = sdk.entry.fields.multImg;
  // const imgGalleryField = sdk.entry.fields[CONTENT_FIELD_GALLERY];
    // replace with the following var
    // const fields = sdk.entry.fields // use (e.g: fields.name, fields.image.getValue())
  // number fields
  const costField = sdk.entry.fields.cost;
  // list fields 
  const damsField = sdk.entry.fields.dam;

  // reference fields
  const motherField = sdk.entry.fields.mother;

  // state variables for entry fields
  const [name,setName] = useState(nameField.getValue());
  const [sire,setSire] = useState(sireField.getValue());
  const [body,setBody] = useState(bodyField.getValue()); // this includes all locales
  const [cost,setCost] = useState(costField.getValue());
  const [onSale,setOnSale] = useState(isOnSaleField.getValue());
  const [isHistoric,setIsHistoric] = useState(isHistoricField.getValue());
  const [isGreatestCow,setIsGreatestCow] = useState(isGreatestCowField.getValue());  
  const [isOnMainSite,setIsOnMainSite] = useState(isOnMainSiteField.getValue());
  const [damList,setDamList] = useState(damsField.getValue() === undefined ? Array<string>() : damsField.getValue());
  const [mother,setMother] = useState({} as any); // empty object {} as any
  // mainImage (profile img)
  const [mainImg, setMainImg] = useState(mainImgField.getValue(sdk.locales.default)); // default: 'es-MX'
  const [mainImg_loading, setMainImg_loading] = useState(false);
  // image gallery
  const [imgGallery, setImgGallery] = useState(imgGalleryField.getValue(sdk.locales.default) === undefined ? [] : imgGalleryField.getValue(sdk.locales.default));
  const [imgGallery_loading, setImgGallery_loading] = useState(false);
  
  // state variables for modals, temporary values not relevant to being saved/fetched before hand
  const [isModalShown,setIsModalShown] = useState(false);
  const [isDropdownShown,setIsDropdownShown] = useState(false);
  const [allEntries,setAllEntries] = useState(Array<Object>());
  const [listValue,setListValue] = useState("");

  // handlers
  /**
   * This handler takes charge of all boolean fields.
   * Since there are not many fields, a switch statment is executed to modify the desired field
   * @param event the html input event 
   * @param type used to denote event type, accepts following as input { sale, history, greatest, main }
   */
  const onBooleanChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const isTrue = event.target.value === 'yes';
    switch(type){
      case "sale":
        if(!isTrue) setCost("");
        isOnSaleField.setValue(isTrue);
        setOnSale(isTrue);
        break;
      case "history":
        isHistoricField.setValue(isTrue);
        setIsHistoric(isTrue);
        break;
      case "greatest":
        isGreatestCowField.setValue(isTrue);
        setIsGreatestCow(isTrue);
        break;
      case "main":
        isOnMainSiteField.setValue(isTrue);
        setIsOnMainSite(isTrue);
        break;
      default:
        Notification.warning("The boolean event does not belong to the list of values");
    }
  };
  const onNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const strToCapitalize = event.target.value.replace(/\b(\w)/g, s => s.toUpperCase()); // capitalizes every word automatically using regex expressions
    const strToCapitalize = event.target.value.toUpperCase(); // capitalizes every word automatically using regex expressions
    nameField.setValue(strToCapitalize);
    setName(strToCapitalize);
  };
  const onSireChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const strToUpper = event.target.value.toUpperCase();
    sireField.setValue(strToUpper);
    setSire(strToUpper);
  };
  const onBodyChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    bodyField.setValue(event.target.value);
    setBody(event.target.value)
  };
  const onCostChangeHandler = (newCost: string) => {
    setCost(newCost);
    costField.setValue(parseInt(newCost));
  };

  // const updateList = () => {

  // };
  const onListChangeHandler = (key: string, index: number = -1) => {
    if(key === "Enter" && listValue.length > 0){
      // console.log("Key pressed\t",key);
      // console.log("Input val\t",listValue);
      const arr = [...damList,listValue];
      setDamList(arr); // rename variable
      setListValue("");
      damsField.setValue(arr);
    }
    // if(key === "Remove" && index !== -1){
    //   console.log("there is a desired index to remove from the array\t",index);
    // }    
  };

  // react-beautiful-dnd list handler
  const handleOnDragEnd = (result:any) => {
    // temporary, works only on one array, perhaps recieving args with setter and getter can work
    const arr = [...damList];
    const [reorderedItem] = arr.splice(result.source.index, 1);
    arr.splice(result.destination.index, 0, reorderedItem);
    setDamList(arr);
    damsField.setValue(arr);
  };

  const removeFromList = (index:number) => {
    const arr = [...damList]; // copy the state array to a mutable constant
    arr.splice(index,1);
    setDamList(arr);
    damsField.setValue(arr);
    // .setValue(arr)
  };

  // Functions for handling images
  const createBase64 = (file:File) => {
    // convert to type 64
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
  
      reader.onload = function(e:any) {
        resolve(e.target.result.split(","))
      }
  
      reader.onerror = function(e:any) {
        reject(e.error)
      }
  
      reader.onabort = function(e) {
        reject(new Error("File aborted."))
      }
  
      reader.readAsDataURL(file)
    });
  };

  const createAsset = async(upload:any, file:any, locale:string) => {
    const asset:any = {
      fields: {
        title: {},
        description: {},
        file: {}
      }
    };

    asset.fields.title[locale] = file.name;
    asset.fields.description[locale] = file.name;
    asset.fields.file[locale] = {
      contentType: file.type,
      fileName: file.name,
      uploadFrom: {
        sys: {
          type: 'Link',
          linkType: 'Upload',
          id: upload.sys.id
        }
      }
    };

    return sdk.space.createAsset(asset);
  };

  const processAndPublishAsset = async(rawAsset:any,locale:string) => {
    await sdk.space.processAsset(rawAsset,locale);
    console.log("Processing done");

    // wait until asset is processed
    const processedAsset = await sdk.space.waitUntilAssetProcessed(
      rawAsset.sys.id,
      locale
     );
    console.log("Waiting for processed asset done!!!!");

    // Publish the asset, ignore if it fails
    let publishedAsset;
    try {publishedAsset = await sdk.space.publishAsset(processedAsset)}
    catch (e) {
      console.log("Error : ",e);
    }
    console.log("Done ",publishedAsset);
    // console.log("Asset published??");
    return publishedAsset
  };

  /**
   * 
   * @param base64Data : Array[base64Prefix, base64Data]
   * @param file : Image File
   */
  const createAssetFromBase64 = async(base64Data:Array<string>, file:File) => {
    console.log("64Data\t",base64Data);
    // Upload the Base64 encoded image
    const upload = await sdk.space.createUpload(base64Data[1]);
    console.log("upload\t",upload);

    let locale = 'es-MX';

    const rawAsset = await createAsset(upload,file,locale);
    console.log("rawAsset\t",rawAsset);

    return processAndPublishAsset(rawAsset,locale);

    // // en-US upload
    // locale = 'en-US';
    // const rawAsset_US = await createAsset(upload,file,locale);
    // processAndPublishAsset(rawAsset_US,locale);

    // this.setUploadProgress(40);

    // // Some customers use different locale model than others, so we need to figure out what works for them best
    // const locale = this.findProperLocale();

    // // Create an unprocessed asset record that links to the upload record created above
    // // It reads asset title and filenames from the HTML5 File object we're passing as second parameter
    // const rawAsset = await this.createAsset(upload, file, locale);
    // this.setUploadProgress(50);
    // this.processAndPublishAsset(rawAsset, locale);
  };

  // async(files:any[]) # previous implementation
  const createNewAssetFromFiles = async(file:File) => {
    // if(files.length > 1) return "this function does not yet exist (handling multiple files)"
    // console.log("files\t",files);

    // const file:File = files[0];
    let data64:any;
    
    // Encode the file as Base64, so we can pass it through SDK proxy to get it uploaded
    await createBase64(file).then((data) => data64=data);
    return createAssetFromBase64(data64,file);
  };


  const unlinkAsset = async(img:any,field:string) => {
    mainImgField.setValue(undefined).then(()=>Notification.success('Imagen removida existosamente')).catch((e)=>console.log("Error: ",e));
    setMainImg(null);
  };

  const unlinkAssetFromGallery = (index:number) => {
    // setImgGallery([...imgGallery.slice(0, index), ...imgGallery.slice(index + 1)]); // other solution using slice
    const arr = [...imgGallery]; // using an array like this allows working with splice, since other solutions require mutating the array, avoiding re-rendering
    arr.splice(index,1);
    setImgGallery(arr);
    // splice removes, slice extracts from an array

    imgGalleryField.setValue(arr.map((asset) => ({
      sys: {
        type: 'Link',
        linkType: 'Asset',
        id: asset.sys.id
      }
    })));
    Notification.success("Foto Removida Exitosamente");
  };

  const removeReference = () => {
    setMother({});
    motherField.setValue(undefined);
  };

  const modifyExistingEntry = async(id:string) => {
    const entry:any = await sdk.navigator.openEntry(id,{ slideIn: { waitForClose: true }});
    motherField.setValue({
      sys: {
        type: 'Link',
        linkType: 'Entry',
        id: entry.entity.sys.id
      }
    }); // this line perhaps is unnecesary since entry remains the same, unless it is deleted
    if (entry.entity.fields.image){
      entry.entity.fields.image = await sdk.space.getAsset(entry.entity.fields.image[sdk.locales.default].sys.id); 
    } else {
      entry.entity.fields.image = null;
    }
    setMother(entry.entity);
  };

  const selectEntry = (entry:any) => {
    console.log("My selected entry\t",entry);
    motherField.setValue({
      sys: {
        type: 'Link',
        linkType: 'Entry',
        id: entry.sys.id
      }
    });
    setMother(entry);
    setIsModalShown(false);
    // save to field
  }; 

  const getNewEntry = async() => {
    const { entity } = await sdk.navigator.openNewEntry("cow",{ slideIn: { waitForClose: true }});
    // console.log("this is all whats done for the entity \t",entity);
    selectEntry(entity);
  };

  const getAllEntries = async(content_type:string) => {
    let arr;
    await sdk.space.getEntries({ content_type: content_type }).then((entries)=>arr=entries.items.filter((entry:any) => entry.sys.id !== sdk.entry.getSys().id));
    await Promise.all(arr.map(async(entry) => {
      if(entry.fields.image){
        entry.fields.image = await sdk.space.getAsset(entry.fields.image[sdk.locales.default].sys.id); 
        return entry;
      } 
      else {
        entry.fields.image = null;
        return entry;
      }
    }));
    setAllEntries(arr);
  };

  useEffect(() => {
    const getAllAssets = async() => {
      const arr:Array<any> = [];
      await Promise.all(imgGallery.map(async(file) => {
          await sdk.space.getAsset(file.sys.id).then((asset) =>  arr.push(asset));
        }
      ));
      // setImgGallery_loading(false);
      setImgGallery(arr);
    };
    const getEntry = async(entryId:string, action:Function) => {
      let entry;
      await sdk.space.getEntry(entryId).then(async(_entry) => {
        entry = _entry;
        if (entry.fields.image){
          entry.fields.image = await sdk.space.getAsset(entry.fields.image[sdk.locales.default].sys.id); 
        } else {
          entry.fields.image = null;
        }
      });
      action(entry); // sets the entry to the given state setter, filling with an object
    };

    if (mainImg){
      setMainImg_loading(true);
      sdk.space.getAsset(mainImg.sys.id).then((asset) => {setMainImg_loading(false);setMainImg(asset);}).catch((e)=>unlinkAsset(mainImg,"image"));
    }
    if (imgGallery){
      getAllAssets(); // an implementation like this allows using async functions in order to get all assets
    }
    if(motherField.getValue()){
      getEntry(motherField.getValue().sys.id,setMother);
    }

    // eslint disabled since this hook only focuses on running once, without monitoring for changes
    // eslint-disable-next-line
  },[]);

  // console.log("main img \t",mainImg);
  // console.log("img gallery \t",imgGallery);

  // dropzone for profile Img
  const mainImg_Dropzone = useDropzone({
    accept: 'image/*',
    onDrop: async(acceptedFiles:Array<any>) => {

      // check if file already exists
      setMainImg_loading(true); // start showing spinner

      // createNewAsset
      const myAsset = await createNewAssetFromFiles(acceptedFiles[0]).catch(() => {setMainImg_loading(false);Notification.error('Hubo un error al subir la imagen');});
      console.log("i read it good");
      mainImgField.setValue({
        sys: {
          type: 'Link',
          linkType: 'Asset',
          id: myAsset.sys.id
        }
      });
      setMainImg_loading(false); // stop showing spinner
      setMainImg(myAsset);
      Notification.success('Imagen Subida Existosamente');
    },
    // maxFiles: 1
    multiple: false,
    noClick: true,
    noKeyboard: true
  });

  const imgGallery_Dropzone = useDropzone({
    accept: 'image/*',
    onDrop: async(acceptedFiles:Array<any>) => {
      const arr = [...imgGallery];
      const timeStart = performance.now();

      console.log("TYPE original ",typeof arr)

      console.log("MUL FILES\t",arr);
      setImgGallery_loading(true); // show spinner

      // waits for all assets to be ready before saving changes
      await Promise.all(acceptedFiles.map(async(file) => {
        console.log("A file\t",file);
        const myAsset = await createNewAssetFromFiles(file);
        arr.push(myAsset);
        setImgGallery((prev) => [...prev,myAsset]); // to show current loaded imgs
      })); // finishes once the entire operation is done
      // for await(const file of acceptedFiles){ // slower
      //   console.log("A file\t",file);
      //   const myAsset = await createNewAssetFromFiles(file);
      //   arr.push(myAsset);
      // }
      imgGalleryField.setValue(arr.map((asset) => ({
        sys: {
          type: 'Link',
          linkType: 'Asset',
          id: asset.sys.id
        }
      })));
      setImgGallery_loading(false);
      console.log("ASSETS\t",arr);
      console.log("TYPE ",typeof arr)
      setImgGallery(arr);
      Notification.success(`Imagenes Subidas Exitosamente en ${Math.round((performance.now()-timeStart)/1_000)} segundos`);
    },
    multiple: true,
    noClick: true,
    noKeyboard: true
  });

  // shows image gallery pictures
  const thumbs = imgGallery.length > 0 &&  imgGallery.map((file,index) => (
      file.sys.type === "Link" 
      ?
      <div style={{...thumb,boxSizing: 'border-box', position: 'relative' }} key={file.sys.id}>
        <SkeletonContainer>
          <SkeletonImage width="100%" height="100%" />
        </SkeletonContainer>
      </div>
      :
      <div style={{...thumb,boxSizing: 'border-box', position: 'relative'}} key={file.sys.id}>
        <Button icon="Close" onClick={() => unlinkAssetFromGallery(index)} size="small" buttonType="negative" style={{position: 'absolute', top: '-5px', right: '-5px', borderRadius: '100%', width: '2rem'}} />
        <div style={thumbInner}>        
          <img
            alt={file.sys.id}
            // src={file.preview}
            src={file.fields.file[sdk.locales.default].url}
            // src={file.sys.type === "Asset" ? file.fields.file[sdk.locales.default].url : "https://via.placeholder.com/200x200"}
            style={imgStyle}
          />
        </div>
      </div>
  ));
// console.log("mother\t",motherField.getValue());

// include a translation for english!!!!!! whteher an automatic or a manual typed one

  return (
    <div style={{backgroundColor: 'white', }}>
        <div className="f36-margin--l">
          <Typography>
            <DisplayText>Registrar Nueva Vaca</DisplayText>
            <Paragraph>Aqui se puede agregar o modificar la info de una vaca</Paragraph>
            <SectionHeading>Nombre</SectionHeading>
            <TextInput onChange={(event) => onNameChangeHandler(event)} value={name} />
            <br/>
            <SectionHeading>Sire</SectionHeading>
            <TextInput name="description" onChange={(event) => onSireChangeHandler(event)} value={sire} />
            <br/>
            <SectionHeading>Dams</SectionHeading>
            <TextInput value={listValue} placeholder="Agregar Dam, presiona 'Enter' para agregar" onChange={(newVal) => setListValue(newVal.target.value.toUpperCase())} onKeyUp={(e) => onListChangeHandler(e.key)} />
            {
              damList.length > 0
              ?
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="droppable">
                  {
                    (provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps} >
                      <List element="ul" style={{padding: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                        {
                          damList.map((item,index) => (
                            // <Card style={{margin: '10px 0 ', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            //   {item}
                            //   <Button icon="Close" onClick={() => removeFromList(index)} size="small" style={{margin: 0}} buttonType="negative" >Remover de Lista</Button>
                            // </Card>
                            <Draggable key={index} draggableId={`${index}`} index={index}>
                              { (provided) => (
                                <div ref={provided.innerRef} {...provided.draggableProps}>
                                  <Pill style={{margin: '10px', display: 'flex', alignItems: 'center'}} label={item} onDrag={() => {}} dragHandleComponent={<div {...provided.dragHandleProps}><Icon icon="Drag" size="medium" color="muted" /></div>} onClose={() => removeFromList(index)} />
                                </div>
                              )}
                            </Draggable>
                          ))
                        }
                      </List>
                      {provided.placeholder}
                      </div>
                    )
                  }
                </Droppable>
              </DragDropContext>
              :
              <div style={{marginTop: '10px'}}>
                <EmptyState 
                headingProps={{ text: 'Agrega un nuevo item' }}
                imageProps={{
                  url:
                    'data:imageProps/png;base64,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',
                  width: '113px',
                  height: '83px',
                  description: 'Image descriptionProps',
                }}
                descriptionProps={{
                  text:
                    'Agrega un nuevo item a la lista presionando "Enter". No te preocupes por el formato, ya nos encargamos de eso',
                }}
              />
              </div>
            }
            <br/>
            <SectionHeading>Acerca de la Vaca</SectionHeading>
            <Textarea name="description" rows={5} onChange={(event) => onBodyChangeHandler(event)} value={body} />
            <br/>
            {/* Boolean Fields */}
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <SectionHeading style={{padding: 0}}>{sdk.contentType.fields[4].name}</SectionHeading>
                <FieldGroup row={false}>
                  <RadioButtonField
                    labelText="Si"
                    checked={isHistoric}
                    value="yes"
                    onChange={(event) => onBooleanChangeHandler(event,"history")}
                    name="history"
                    id="yesCheckbox"
                  />
                  <RadioButtonField
                    labelText="No"
                    checked={isHistoric === false}
                    value="no"
                    onChange={(event) => onBooleanChangeHandler(event,"history")}
                    name="history"
                    id="noCheckbox"
                  />
                </FieldGroup>
              </div>
              <br/>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <SectionHeading>{sdk.contentType.fields[5].name}</SectionHeading>
                  <FieldGroup row={false}>
                    <RadioButtonField
                      labelText="Si"
                      checked={isGreatestCow}
                      value="yes"
                      onChange={(event) => onBooleanChangeHandler(event,"greatest")}
                      name="greatest"
                      id="yesCheckbox"
                    />
                    <RadioButtonField
                      labelText="No"
                      checked={isGreatestCow === false}
                      value="no"
                      onChange={(event) => onBooleanChangeHandler(event,"greatest")}
                      name="greatest"
                      id="noCheckbox"
                    />
                  </FieldGroup>
              </div>
              <br/>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <SectionHeading>{sdk.contentType.fields[6].name}</SectionHeading>
                  <FieldGroup row={false}>
                    <RadioButtonField
                      labelText="Si"
                      checked={isOnMainSite}
                      value="yes"
                      onChange={(event) => onBooleanChangeHandler(event,"main")}
                      name="main"
                      id="yesCheckbox"
                    />
                    <RadioButtonField
                      labelText="No"
                      checked={isOnMainSite === false}
                      value="no"
                      onChange={(event) => onBooleanChangeHandler(event,"main")}
                      name="main"
                      id="noCheckbox"
                    />
                  </FieldGroup>
              </div>
            </div>
            <br/>
              <SectionHeading>{sdk.contentType.fields[7].name}</SectionHeading>
              <FieldGroup row={false}>
                <RadioButtonField
                  labelText="Si"
                  checked={onSale}
                  value="yes"
                  onChange={(event) => onBooleanChangeHandler(event,"sale")}
                  name="abstractOption"
                  id="yesCheckbox"
                />
                <RadioButtonField
                  labelText="No"
                  checked={onSale === false}
                  value="no"
                  onChange={(event) => onBooleanChangeHandler(event,"sale")}
                  name="abstractOption"
                  id="noCheckbox"
                />
              </FieldGroup>
            </Typography>
          {
            onSale && (
              <Typography>
                <SectionHeading style={{marginTop: '20px'}}>Ingresa el precio del Ganado <em>(MXN)</em></SectionHeading>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <div style={{marginRight: '10px'}}><strong>$</strong></div>
                  <TextInput width="medium" type="number" value={cost} onChange={(newVal) => parseInt(newVal.target.value) > 0 ? onCostChangeHandler(newVal.target.value) : ""} required={onSale} placeholder="Ingresa el precio" labelText="Ingresa el precio" />
                </div>
              </Typography>
            )
          }
      </div>
      
      {/* Dialog */}
      <div className="container f36-margin--l">
        <SectionHeading>Seleccionar Madre</SectionHeading>
        <HelpText>Llena esto si es posible</HelpText>

        {
          // mother
          Object.keys(mother).length > 0
          ?
            <Card title={mother.fields.name === undefined ? "" : mother.fields.name[sdk.locales.default]} onClick={() => modifyExistingEntry(mother.sys.id)} style={{margin: '10px 0', position: 'relative'}}  >
              {/* Header */}
              {/* Body */}
              <div style={{display: 'flex', marginTop: '5px'}}>
                <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', margin: '5px' }}>
                  <SectionHeading style={{fontSize: '1em'}} >{mother.fields.name === undefined ? "" : mother.fields.name[sdk.locales.default]}</SectionHeading>
                  <HelpText style={{margin: 0, wordBreak: 'break-word', letterSpacing: 'normal'}}>{mother.fields.body === undefined ? null : mother.fields.body[sdk.locales.default]}</HelpText>
                </div>
                {
                  mother.fields.image
                  ?
                  <div style={{ width: '8rem', height: '6rem'}}>
                    <img
                      alt={mother.sys.id}
                      src={mother.fields.image.fields.file[sdk.locales.default].url}
                      width="100%"
                      height="100%"
                    />
                  </div>
                  :
                  null
                }
              </div>
            </Card>
          :
          null
        }
        <Dropdown 
          isOpen={isDropdownShown} 
          onClose={() => setIsDropdownShown(false)}
          toggleElement={
            <div>
              <Button icon="Edit" buttonType="primary" onClick={() => setIsDropdownShown(true)} >
                  Seleccionar
              </Button>
              {
                Object.keys(mother).length > 0
                ?
                <Button icon="Close" onClick={() => removeReference()} buttonType="negative" style={{marginLeft: '10px'}}>Remover</Button>
                :
                null
              }
            </div>
          }
        >
          <DropdownList>
            <DropdownListItem onClick={() => {setIsDropdownShown(false);setIsModalShown(true);getAllEntries("cow");}}>Seleccionar Entrada <strong>Existente</strong></DropdownListItem>
          </DropdownList>
          <DropdownList border="top">
            <DropdownListItem isTitle onClick={() => {setIsDropdownShown(false);getNewEntry()}}>Crear uno nuevo</DropdownListItem>
          </DropdownList>
        </Dropdown>

        {/* show first a dropdown for choosing an existing set or creating a new entry */}
        <Modal onClose={() => setIsModalShown(false)} title={sdk.contentType.fields[11].name} size="large" isShown={isModalShown}>
          {/* <Autocomplete items={allEntries} onQueryChange={(e) => console.log("Query changed ",e)} onChange={(e) => console.log("A change\t",e)} placeholder="Buscar" emptyListMessage="Está vacio" width="full" noMatchesMessage="No existe" >
            {(entries:Object[]) =>
              entries.map((option:any) => <span key={option.sys.id}>{option.fields.name[sdk.locales.default]}</span>)
            }
          </Autocomplete> */}
          <Modal.Content>
          {/* {console.log("what i read ", allEntries)} */}
            { allEntries.length > 0 
              ?
              allEntries.map((entry:any) => (
                <Card key={entry.sys.id} title={entry.fields.name === undefined ? "" : entry.fields.name[sdk.locales.default]} style={{margin: '10px 0'}} onClick={() => selectEntry(entry)} >
                  {/* Header */}
                  <div style={{borderBottom: '1px solid #d3dce0', margin: 0, padding: 0}}>
                    <div style={{fontSize: '0.875rem'}} >Vaca</div>
                  </div>

                  {/* Body */}
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px'}}>
                    <div style={{flex: 1, margin: '5px' }}>
                      <h3 style={{marginTop: '10px'}}>{entry.fields.name === undefined ? "" : entry.fields.name[sdk.locales.default]}</h3>
                      <p style={{margin: 0, wordBreak: 'break-word', letterSpacing: 'normal'}}>{entry.fields.body === undefined ? "" : entry.fields.body[sdk.locales.default]}</p>
                    </div>
                    {
                      entry.fields.image
                      ?
                      <div style={{ width: '6rem', height: '6rem'}}>
                        <img
                          alt={entry.sys.id}
                          src={entry.fields.image.fields.file[sdk.locales.default].url}
                          width="100%"
                          height="100%"
                        />
                      </div>
                      :
                      null
                    }
                  </div>
                </Card>
              ))
              :
              <EmptyState 
                headingProps={{ text: 'Está Vacio' }}
                imageProps={{
                  url:
                    'data:imageProps/png;base64,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',
                  width: '340px',
                  height: '250px',
                  description: 'Image descriptionProps',
                }}
                descriptionProps={{
                  text:
                    "Una vez que agregues más vacas, estás empezarán a salir aquí"
                }}
              />
            }
          </Modal.Content>
          {/* <Modal.Controls>
            <Button onClick={() => setIsModalShown(false)}>Cerrar</Button>
          </Modal.Controls> */}
        </Modal>
      </div>

      {/* Avatar/Main Image */}
      <div className="container f36-margin--l" /*style={{display: 'flex', flexDirection: 'column', margin: '2em'}}*/>
        <Paragraph>Select an image</Paragraph>
        {
          mainImg && mainImg.sys.type !== "Link"
          ?
          <div style={{ textAlign: 'center' }}>
            <img
              alt={mainImg.name}
              // src={mainImg.preview}
              src={mainImg.fields.file[sdk.locales.default].url}
              style={{width: '75%', height: 'auto'}}
            />
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
              {/* <Button buttonType="naked" onClick={() => sdk.dialogs.selectSingleAsset({locale: sdk.locales.default})} >
                  Cambiar por Imagen ya Subida
              </Button> */}
              <Button icon="Edit" buttonType="muted" onClick={() => sdk.navigator.openAsset(mainImg.sys.id, {slideIn: true})} >
                  Editar Imagen
              </Button>
              <Button icon="Close" buttonType="negative" onClick={() => unlinkAsset(mainImg,"image")} >
                  Remover Imagen
              </Button>
            </div>
          </div>
          :
          <div {...mainImg_Dropzone.getRootProps()}>
            { mainImg_loading && 
              <div style={{margin: '1em 0'}}>
                <Spinner color="primary" size="large" />
              </div> 
            }
            <input {...mainImg_Dropzone.getInputProps()} />
              <Button icon="FolderCreate"  buttonType="primary" onClick={mainImg_Dropzone.open} >
                Agregar Imagen
              </Button>
          </div>
        }
      </div>

      {/* Image Gallery */}
      <div className="container f36-margin--l" /*style={{display: 'flex', flexDirection: 'column', margin: '2em'}}*/>
        <Paragraph>Select Image Gallery</Paragraph>
          {/* display img gallery */}
          <div style={{display: 'flex', flexWrap: 'wrap', marginTop: '10px'}}>
            {
              imgGallery.length > 0
              ?
                thumbs
              :
              null
            }
            {imgGallery_loading && <Spinner color="primary" />}
          </div>

          <div {...imgGallery_Dropzone.getRootProps()}>
            <input {...imgGallery_Dropzone.getInputProps()} />
              <Button icon="FolderCreate" buttonType="primary" onClick={imgGallery_Dropzone.open} >
                Agregar Imagen
              </Button>
          </div>
      </div>



      {/* <section className="container">
        <div {...mainImg_Dropzone.getRootProps({className: 'dropzone'})}>
          <input {...mainImg_Dropzone.getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside style={{  display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: 16}}>
          {thumbs}
        </aside>
      </section> */}

      {/* use yandex translation api for english translations of body */}
      {/* <Paragraph>Another test</Paragraph> */}
    </div>
  );
};

export default Entry;
