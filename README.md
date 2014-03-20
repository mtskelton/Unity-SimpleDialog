#SimpleDialog for Unity (v0.1)

SimpleDialog is exactly that, a very simple text and dialog box display system for Unity.  It's designed to be lightweight and is currently being developed as part of a retro style RPG.  It's primary intention is to display character conversations.

The whole thing is written in Unity JS, but should be useable from other languages.  Your mileage may vary though.

--

##Getting Started

At the moment the easiest way to install is to just copy this project into your Assets folder.  You can then access the SimpleDialogManager class statically from other scripts.

In order to render the dialog boxes, you will need at least one script attached to your scene to call the OnGUI and Update functions within the SimpleDialogManager class.

Alternatively you can create an empty game object and add the SimpleDialogManager script to it.

At the moment I would recommend disabling all character input while dialogs are displayed, as it currently responds to the Fire1 and Jump commands to speed up and clear the dialogs.  You can find out if there is a current dialog being displayed with SimpleDialogManager.HasDialog().



## Create a Dialog

At the moment, just the following dialog boxes are supported:

###SimpleDialogManager.AddTextDialog(msg:String, callback:Function = null, style:GUIStyle = null, background:GUITexture = null)
This will create a simple typing text dialog and add it to the queue.  You can optionally provide a GUIStyle and background texture of your own to specify a different font or colouring, and provide a callback which will be executed when the dialog is dismissed.

SimpleDialogCallback is simply a void function with no parameters ... e.g.

(C#)
public void callback()

(JS)
function callback()
