using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class test : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }
    void OnMouseEnter()
    {
        Debug.Log("ui 위로 마우스!");
    }
    // Update is called once per frame
    void Update()
    {
        //Debug.Log(EventSystem.current.IsPointerOverGameObject());
    }
}
