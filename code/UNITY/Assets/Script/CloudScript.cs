using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CloudScript : MonoBehaviour
{

    private Animation _anim;

    // Start is called before the first frame update
    void Start()
    {
        _anim = this.GetComponent<Animation>();

        _anim.Play("Cloud");
    }

}
