#pragma strict

public class SimpleDialog {
	var type:String = "";
	var text:String = "";
	var callback:Function = null;
	var background:Texture = null;
	var style:GUIStyle = null;
	var portrait:Texture = null;

	// Used on the "text" dialog type to create the typewriter effect
	var textWidth:int = 0;
	var textHeight:int = 0;
	var currentTextChar:int = 0;
	var lastTick:float = 0;
}


public class SimpleDialogManager {
	private static var dialogs:Array = new Array(); // Our queue of dialogs
	private static var currentDlg:SimpleDialog = null;

	public static function AddTextDialog(msg:String, callback:Function, style:GUIStyle, background:Texture) {
		var dlg:SimpleDialog = new SimpleDialog();
		dlg.type = "text";
		dlg.text = msg;
		dlg.callback = callback;
		dlg.background = background;
		dlg.style = style;
		dialogs.Add(dlg);
	}
	public static function AddTextDialog(msg:String, callback:Function, style:GUIStyle) {
		AddTextDialog(msg, callback, style, null);
	}
	public static function AddTextDialog(msg:String, callback:Function) {
		AddTextDialog(msg, callback, null, null);
	}
	public static function AddTextDialog(msg:String) {
		AddTextDialog(msg, null, null, null);
	}	

	public static function AddCharacterTextDialog(msg:String, callback:Function, style:GUIStyle, background:Texture, portrait:Texture) {
		var dlg:SimpleDialog = new SimpleDialog();
		dlg.type = "text";
		dlg.text = msg;
		dlg.callback = callback;
		dlg.background = background;
		dlg.style = style;
		dlg.portrait = portrait;
		dialogs.Add(dlg);
	}
	
	public static function OnGUI() {
		if(currentDlg == null && dialogs.length > 0) {
			currentDlg = dialogs[0] as SimpleDialog;
			dialogs.RemoveAt(0);
		}
	
		if(currentDlg != null) {
			if(currentDlg.type == "text") {
				if(currentDlg.lastTick == 0) currentDlg.lastTick = Time.realtimeSinceStartup;
				
				if(Time.realtimeSinceStartup - currentDlg.lastTick > 0.05f) {
					if(currentDlg.currentTextChar < currentDlg.text.Length) currentDlg.currentTextChar += 1;
					currentDlg.lastTick = Time.realtimeSinceStartup;
				}
				
				if(currentDlg.style == null) currentDlg.style = new GUIStyle();
				if(currentDlg.textWidth == 0) currentDlg.textWidth = 400;
				if(currentDlg.textHeight == 0) currentDlg.textHeight = (currentDlg.style.CalcHeight(new GUIContent(currentDlg.text), currentDlg.textWidth) * 600) / Screen.height;
				
				if(currentDlg.portrait != null) {
					var a:float = (currentDlg.portrait.width * 1.0f) / (currentDlg.portrait.height * 1.0f);
					GUI.DrawTexture(ResizeGUI(Rect(400 - ((currentDlg.textWidth+10)/2), 200 - ((currentDlg.textHeight+10)/2), 100*a, 100)), currentDlg.portrait);
				}
				
				GUI.DrawTexture(ResizeGUI(Rect(400 - ((currentDlg.textWidth+10)/2), 300 - ((currentDlg.textHeight+10)/2), currentDlg.textWidth+10, currentDlg.textHeight+10)), currentDlg.background);
				GUI.Label(ResizeGUI(Rect(400 - (currentDlg.textWidth/2), 300 - (currentDlg.textHeight/2), currentDlg.textWidth, currentDlg.textHeight)), currentDlg.text.Substring(0, currentDlg.currentTextChar), currentDlg.style);
			}
		}
	}

	public static function Update() {
		if (Input.GetButtonDown("Fire1") || Input.GetButtonDown("Jump")) {
			if(currentDlg.type == "text" && currentDlg.currentTextChar < currentDlg.text.Length) {
				currentDlg.currentTextChar = currentDlg.text.Length;
				return;
			}
			if(currentDlg.callback != null)
				currentDlg.callback();
			currentDlg = null;
		}
	}

	public static function HasDialog() {
		return currentDlg != null;
	}

	/**
	 * Simple scaling routine used internally to position a dialog accurately across all screen sizes.
	 * At least that's the theory!
	 */
	static public function ResizeGUI(_rect:Rect) : Rect
	{
		var FilScreenWidth = _rect.width / 800;
		var rectWidth = FilScreenWidth * Screen.width;
		var FilScreenHeight = _rect.height / 600;
		var rectHeight = FilScreenHeight * Screen.height;
		var rectX = (_rect.x / 800) * Screen.width;
		var rectY = (_rect.y / 600) * Screen.height;
		
		return Rect(rectX,rectY,rectWidth,rectHeight);
	}

}

public function Update() {
	SimpleDialogManager.Update();
}
public function OnGUI() {
	SimpleDialogManager.OnGUI();
}
