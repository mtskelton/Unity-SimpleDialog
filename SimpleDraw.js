#pragma strict

/**
 * A series of primitive drawing classes with the aim of simplifying Unity GUI
 * Everything works in screen space co-ordinates from -1.0 to 1.0, with 0.0, 0.0 being the screen center.
 * Aspect ratio is calculated based on height, so the actual width may vary.
 * You can obtain the real width by calling getWidth()
 */

public class SimpleDraw {
	public static function FillRect(x:float, y:float, w:float, h:float) {
		GUI.Box(Rect(SimpleDraw.x(x), SimpleDraw.y(y), SimpleDraw.w(w), SimpleDraw.h(h)), GUIContent.none);
	}
	public static function DrawText(x:float, y:float, w:float, h:float, text:String, style:GUIStyle) {
		GUI.Label(Rect(SimpleDraw.x(x), SimpleDraw.y(y), SimpleDraw.w(w), SimpleDraw.h(h)), text, style);
	}
	public static function CalcTextHeight(text:String, textWidth:float, style:GUIStyle):float {
		return sh(style.CalcHeight(new GUIContent(text + "\n"), w(textWidth)));
	}
	public static function DrawTexture(x:float, y:float, w:float, h:float, texture:Texture) {
		GUI.DrawTexture(Rect(SimpleDraw.x(x), SimpleDraw.y(y), SimpleDraw.w(w), SimpleDraw.h(h)), texture);	
	}
	
	/**
	 * Convert an X screen space co-ordinate onto a resolution dependent one
	 */
	public static function w(x:float):int {
		return Screen.width*((x/aspectRatio())/2);
	}
	public static function x(x:float):int {
		return w(x)+(Screen.width/2.0f);
	}
	
	public static function h(y:float):int {
		return Screen.height*(y/2.0f);
	}
	public static function sh(y:float):float {
		return (y/(Screen.height*1.0f))*2.0f;
	}
	public static function y(y:float):int {
		return h(y)+(Screen.height/2.0f);
	}
	
	public static function aspectRatio():float {
		return (Screen.width*1.0f)/(Screen.height*1.0f);
	}
	
	public static function getWidth():float {
		return 1.0f*aspectRatio();
	}
	public static function getHeight():float {
		return 1.0f;
	}
}